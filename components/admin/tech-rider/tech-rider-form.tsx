"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { fi } from "date-fns/locale";
import axios from "axios";
import { TechRider } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

interface TechRiderFormProps {
  artistId: string;
  techRiderEntry?: any;
  title: string;
  techRiderType: string;
  brands: {
    name: string;
    icon: React.ReactNode;
    models: string[];
  }[];
  description: string;
}

const BrandSchema = z.object({
  brand: z.string(),
  models: z.array(z.string()),
});

const FormSchema = z.array(BrandSchema);

export const TechRiderForm = (props: TechRiderFormProps) => {
  const {
    title,
    techRiderType,
    brands,
    description,
    techRiderEntry,
    artistId,
  } = props;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    values: techRiderEntry ? techRiderEntry[0][techRiderType] : brands.map((brand) => ({
      brand: brand.name,
      models: [],
    })),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = await axios.post(`/api/tech-rider/`, {
      data: [data],
      techRiderType,
      artistId,
    });
    if (response.status === 200) {
      toast({
        title: "Changes saved.",
        description: (
          <p>Information saved for {techRiderType}</p>
        ),
      });
    } else {
      toast({
        title: "An error occurred.",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    }
  }


  return (
    <Card>
      <CardContent className="flex flex-col pt-9 h-full justify-between space-y-8">
      <CardTitle>{title}</CardTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full justify-between space-y-8">
            <Accordion type="single" collapsible>
              {brands.map((brand, index) => (
                <AccordionItem key={brand.name} value={`brand-${index}`}>
                  <AccordionTrigger>{brand.name}</AccordionTrigger>
                  <AccordionContent>
                    <FormItem>
                      {brand.models.map((model) => (
                        <FormField
                          key={model}
                          control={form.control}
                          name={`${index}.models`}
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={model}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(model)}
                                    value={model}
                                    onCheckedChange={(value) => {
                                      field.onChange(
                                        field.value?.includes(model)
                                          ? field.value.filter(
                                              (item: string) => item !== model
                                            )
                                          : field.value
                                          ? [...field.value, model]
                                          : [model]
                                      );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {model}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Button variant={"defaultButton"} type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

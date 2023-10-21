"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField } from "@/components/ui/form";
import TechRiderFormInput from "./tech-rider-form-input";
import axios from "axios";

interface TechRiderFormProps {
  title: string;
  description: string;
  brands: string[];
  techRiderType: string;
}

const techRiderFormSchema = z.array(
  z.object({
    brand: z.string(),
    model: z.string(),
  })
);

type TechRiderField = {
  brand: string;
  model: string;
};

const TechRiderForm = (props: TechRiderFormProps) => {
  const { title, description, brands, techRiderType } = props;
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<{
    techRider: TechRiderField[];
  }>({
    defaultValues: {
      techRider: [
        {
          brand: "",
          model: "",
        },
      ],
    },
    resolver: zodResolver(techRiderFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "techRider",
  });

  const addField = () => {
    append({
      brand: "",
      model: "",
    });
  };

  const onSubmit: SubmitHandler<{ techRider: TechRiderField[] }> = async (
    values
  ) => {
    try {
      const response = await axios.patch("/api/tech-rider", {
        techRider: values,
        techRiderType,
      });

      if (response.status === 200) {
        router.refresh();
        toast({
          title: "Success",
          description: "Your changes have been saved.",
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong with your request.",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong with your request.",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-1"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {fields.map((field, index) => (
              <div key={field.id}>
                <FormField
                  control={form.control}
                  name="techRider"
                  render={({ field }) => (
                    <div className="flex gap-1 h-full">
                      <div className="grid grid-cols-2 w-full items-center gap-1">
                        <div className="flex flex-col space-y-1.5">
                          <Select>
                            <SelectTrigger id="brand">
                              <SelectValue placeholder="Brand" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              {brands.map((brand) => (
                                <SelectItem
                                  value={field.value[index].brand || brand}
                                  key={brand}
                                  id={brand}
                                >
                                  {brand}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <FormControl>
                            <Input
                              id="name"
                              defaultValue={field.value[index].model}
                              placeholder="Model"
                            />
                          </FormControl>
                        </div>
                      </div>
                      <button
                        onClick={addField}
                        className="border rounded-md w-12 hover:bg-white/20 duration-300"
                      >
                        +
                      </button>
                    </div>
                  )}
                />
              </div>
            ))}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex gap-1 justify-end">
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
};

export default TechRiderForm;

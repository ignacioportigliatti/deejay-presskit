import FileUpload from '@/components/FileUpload';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputSocial } from '@/components/ui/inputs/InputSocial';
import { InputTags } from '@/components/ui/inputs/InputTags';
import { Textarea } from '@/components/ui/textarea';
import React from 'react'
import { UseFormReturn } from 'react-hook-form';
import { artistFormSchema } from '../modals/NewArtistModal';
import * as z from 'zod';

interface ArtistFormProps {
    form: UseFormReturn<{ name: string; location: string; email: string; bio: string; socialLinks: { name: string; link: string; }[]; imageSrc: string; genres: string[]; }, any, undefined>;
    onSubmit: (values: z.infer<typeof artistFormSchema>) => Promise<void>;
    socialLinks?: { name: string; link: string; }[];
}

const ArtistForm = (props: ArtistFormProps) => {
    const { form, onSubmit, socialLinks } = props;
    return (
        <div>
            <Form {...form}>
                <form
                  className="flex flex-col w-[80%] sm:w-full sm:max-w-full"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="sr-only">Artist Name</FormLabel>
                        <FormControl>
                          <Input
                            id="name"
                            placeholder="A.K.A or Name"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription />
                        <FormMessage className="text-xs leading-none !pt-0 !mt-0" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="sr-only">Artist Email</FormLabel>
                        <FormControl>
                          <Input id="email" placeholder="Email" {...field} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage className="text-xs leading-0" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="sr-only">
                          Artist Birth Place
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="bio"
                            placeholder="Birth Place"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription />
                        <FormMessage className="text-xs leading-0" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="sr-only">Artist Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            id="bio"
                            className="text-xs min-h-[120px]"
                            placeholder="Bio (750 characters max.)"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription />
                        <FormMessage className="text-xs leading-0" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="imageSrc"
                    render={({ field, fieldState }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="sr-only">Artist Image</FormLabel>
                        <FormControl>
                          <FileUpload
                            endpoint="artistImage"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormDescription />
                        <FormMessage className="text-xs leading-0" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="socialLinks"
                    render={({ field, fieldState }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="sr-only">Artist Image</FormLabel>
                        <FormControl>
                          <InputSocial
                            value={JSON.stringify(field.value)}
                            onChange={field.onChange}
                            links={socialLinks}
                          />
                        </FormControl>
                        <FormDescription />
                        <FormMessage className="text-xs leading-0" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="genres"
                    render={({ field, fieldState }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="sr-only">Artist Image</FormLabel>
                        <FormControl>
                          <InputTags {...field} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage className="text-xs leading-0" />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
        </div>
    )
}

export default ArtistForm

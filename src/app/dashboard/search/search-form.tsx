"use client";

import { Input } from "@/components/ui/input";
import { useAction } from "convex/react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem, FormMessage
} from "@/components/ui/form";
import LoadingButton from "@/components/loading-button";
import { api } from "../../../../convex/_generated/api";
import { Doc } from "../../../../convex/_generated/dataModel";

const formSchema = z.object({
    search: z.string().min(3).max(250),
});

export default function SearchForm({
    setResults
}: {
    setResults: (notes: typeof api.search.searchAction._returnType) => void;
}) {
    const searchAction = useAction(api.search.searchAction);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { search: "" },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await searchAction({ search: values.search }).then(setResults);
        form.reset();
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-1 gap-2"
            >
                <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormControl>
                                <Input
                                    placeholder="Search over all your notes and document"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <LoadingButton
                    isLoading={form.formState.isSubmitting}
                    loadingText="Searching..."
                >
                    Search
                </LoadingButton>
            </form>
        </Form>
    );
}

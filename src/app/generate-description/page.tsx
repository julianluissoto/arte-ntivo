"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { generateProductDescription } from "@/ai/flows/generate-product-description";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Copy, Check } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";


const formSchema = z.object({
  productName: z.string().min(3, "Product name is required"),
  keyFeatures: z.string().min(10, "Please list some key features"),
  materials: z.string().min(3, "Please specify materials used"),
  personalizationOptions: z.string().min(3, "Please specify personalization options"),
});

type FormValues = z.infer<typeof formSchema>;

export default function GenerateDescriptionPage() {
  const [generatedDescription, setGeneratedDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasCopied, setHasCopied] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      keyFeatures: "",
      materials: "",
      personalizationOptions: "",
    }
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setGeneratedDescription("");
    try {
      const result = await generateProductDescription(data);
      setGeneratedDescription(result.description);
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if(!generatedDescription) return;
    navigator.clipboard.writeText(generatedDescription);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          AI Product Description Generator
        </h1>
        <p className="mt-4 text-lg text-foreground/80">
          Create compelling, SEO-optimized product descriptions in seconds. Just fill in the details below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>Enter the information about your product.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Product Name</Label>
                      <FormControl>
                        <Input placeholder="e.g., Custom T-Shirt" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="keyFeatures"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Key Features</Label>
                      <FormControl>
                        <Textarea placeholder="e.g., 100% cotton, unisex fit, vibrant print" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="materials"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Materials</Label>
                      <FormControl>
                        <Input placeholder="e.g., Cotton, polyester, acrylic" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="personalizationOptions"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Personalization Options</Label>
                      <FormControl>
                        <Input placeholder="e.g., Custom text, upload photo, choose color" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </div>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Generate Description
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <Card className="flex flex-col sticky top-24">
          <CardHeader>
            <CardTitle>Generated Description</CardTitle>
            <CardDescription>Your AI-crafted description will appear here.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="relative h-full w-full bg-muted/50 rounded-md p-4 min-h-[200px]">
              {isLoading && <p className="text-muted-foreground animate-pulse">Generating, please wait...</p>}
              {error && <p className="text-destructive">{error}</p>}
              {!isLoading && !error && generatedDescription && <p className="whitespace-pre-wrap">{generatedDescription}</p>}
               {!isLoading && !error && !generatedDescription && <p className="text-muted-foreground">The generated text will be shown here.</p>}
              {generatedDescription && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:text-primary"
                  onClick={handleCopy}
                  aria-label="Copy description"
                >
                  {hasCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

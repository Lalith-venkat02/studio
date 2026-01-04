"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getAdminContentSuggestion } from "@/app/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  trendingTopic: z.string().min(3, "Topic must be at least 3 characters long."),
  targetAudience: z.string().min(3, "Audience must be at least 3 characters long."),
});

type FormValues = z.infer<typeof formSchema>;

type Suggestion = {
    advertisingPanelSuggestion: string;
    csrBrandingRecordSuggestion: string;
}

export function ContentSuggestionClient() {
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setSuggestion(null);
    const result = await getAdminContentSuggestion(data);
    setIsLoading(false);

    if (result.success) {
      setSuggestion(result.data!);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Content Suggestion Tool</CardTitle>
          <CardDescription>
            Generate marketing content based on trending environmental topics using AI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="trendingTopic">Trending Topic</Label>
              <Input
                id="trendingTopic"
                placeholder="e.g., Urban heat islands"
                {...register("trendingTopic")}
              />
              {errors.trendingTopic && (
                <p className="text-sm text-destructive mt-1">{errors.trendingTopic.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Input
                id="targetAudience"
                placeholder="e.g., City dwellers, Eco-conscious families"
                {...register("targetAudience")}
              />
              {errors.targetAudience && (
                <p className="text-sm text-destructive mt-1">{errors.targetAudience.message}</p>
              )}
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Suggestions
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        {isLoading && (
            <Card>
                <CardContent className="p-6 flex items-center justify-center h-48">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="ml-4">Generating suggestions...</p>
                </CardContent>
            </Card>
        )}
        {suggestion && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Advertising Panel Suggestion</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  readOnly
                  value={suggestion.advertisingPanelSuggestion}
                  className="h-32"
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>CSR Branding Record Suggestion</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  readOnly
                  value={suggestion.csrBrandingRecordSuggestion}
                  className="h-32"
                />
              </CardContent>
            </Card>
          </>
        )}
        {!isLoading && !suggestion && (
             <Card className="flex items-center justify-center h-full min-h-48 border-dashed">
                <CardContent className="p-6 text-center text-muted-foreground">
                    <p>AI-generated suggestions will appear here.</p>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}

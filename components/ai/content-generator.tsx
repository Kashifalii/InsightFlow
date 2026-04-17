"use client";

import { useState } from "react";
import { Copy, Check, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 shrink-0"
      onClick={handleCopy}
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <Check className="h-4 w-4 text-emerald-500" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );
}

function OutputBlock({ content }: { content: string }) {
  return (
    <div className="relative rounded-lg border border-border bg-muted/50 p-4">
      <div className="absolute right-2 top-2">
        <CopyButton text={content} />
      </div>
      <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground pr-10">
        {content}
      </pre>
    </div>
  );
}

function parseEmails(content: string): { stage: string; body: string }[] {
  const parts = content
    .split(/---EMAIL \d+ — ([^-]+)---/)
    .filter(Boolean);

  const emails: { stage: string; body: string }[] = [];
  for (let i = 0; i < parts.length; i += 2) {
    const stage = parts[i]?.trim();
    const body = parts[i + 1]?.trim();
    if (stage && body) {
      emails.push({ stage, body });
    }
  }
  return emails.length > 0
    ? emails
    : [{ stage: "Email Sequence", body: content }];
}

export function BlogOutliner() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!topic.trim()) {
      toast.error("Please enter a blog topic");
      return;
    }
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "blog", topic, tone }),
      });
      const data = await res.json() as { content?: string; error?: string };
      if (!res.ok || data.error) throw new Error(data.error ?? "Failed");
      setOutput(data.content ?? "");
      toast.success("Blog outline generated");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="blog-topic">Blog Topic</Label>
        <Textarea
          id="blog-topic"
          placeholder="e.g. How to reduce SaaS churn in your first 90 days"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          rows={3}
          className="resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="blog-tone">Tone</Label>
        <Select value={tone} onValueChange={setTone}>
          <SelectTrigger id="blog-tone" className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Professional">Professional</SelectItem>
            <SelectItem value="Casual">Casual</SelectItem>
            <SelectItem value="Technical">Technical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={handleGenerate}
        disabled={loading}
        className="gap-2"
        aria-label="Generate blog post outline"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : (
          <Sparkles className="h-4 w-4" aria-hidden />
        )}
        {loading ? "Generating…" : "Generate Outline"}
      </Button>

      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Generated Outline
            </p>
            <CopyButton text={output} />
          </div>
          <OutputBlock content={output} />
        </div>
      )}
    </div>
  );
}

export function EmailDrafter() {
  const [persona, setPersona] = useState("");
  const [productName, setProductName] = useState("");
  const [emails, setEmails] = useState<{ stage: string; body: string }[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!persona.trim() || !productName.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    setEmails([]);

    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "email", persona, productName }),
      });
      const data = await res.json() as { content?: string; error?: string };
      if (!res.ok || data.error) throw new Error(data.error ?? "Failed");
      setEmails(parseEmails(data.content ?? ""));
      toast.success("Email sequence drafted");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="target-persona">Target Persona</Label>
        <Textarea
          id="target-persona"
          placeholder="e.g. SaaS founders who struggle with high churn rates"
          value={persona}
          onChange={(e) => setPersona(e.target.value)}
          rows={2}
          className="resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="product-name">Your Product Name</Label>
        <Input
          id="product-name"
          placeholder="e.g. InsightFlow"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>

      <Button
        onClick={handleGenerate}
        disabled={loading}
        className="gap-2"
        aria-label="Draft cold email sequence"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : (
          <Sparkles className="h-4 w-4" aria-hidden />
        )}
        {loading ? "Drafting…" : "Draft Email Sequence"}
      </Button>

      {emails.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Generated Email Sequence ({emails.length} emails)
          </p>
          <Accordion type="single" collapsible className="space-y-2">
            {emails.map((email, i) => (
              <AccordionItem
                key={i}
                value={`email-${i}`}
                className="rounded-lg border border-border px-4"
              >
                <AccordionTrigger className="text-sm font-medium hover:no-underline">
                  Email {i + 1} — {email.stage}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2">
                    <OutputBlock content={email.body} />
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}

export function ContentGenerator() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" aria-hidden />
          </div>
          <div>
            <CardTitle className="text-base font-semibold">
              AI Content Generator
            </CardTitle>
            <CardDescription className="mt-0.5">
              Generate blog outlines and cold email sequences powered by Gemini 2.0 Flash.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="blog">
          <TabsList className="mb-6">
            <TabsTrigger value="blog">Blog Post Outliner</TabsTrigger>
            <TabsTrigger value="email">Cold Email Drafter</TabsTrigger>
          </TabsList>
          <TabsContent value="blog">
            <BlogOutliner />
          </TabsContent>
          <TabsContent value="email">
            <EmailDrafter />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

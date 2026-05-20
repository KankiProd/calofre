import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const serviceSchema = z.object({
  title: z.string(),
  metaTitle: z.string().max(60),
  metaDescription: z.string().max(160),
  silo: z.enum(['plomberie', 'chauffage', 'climatisation', 'aides', 'marques', 'communes']),
  category: z.string(),
  keyword: z.string(),
  keywords: z.array(z.string()).default([]),
  geo: z.string().optional(),
  rgeRelated: z.boolean().default(false),
  b2b: z.boolean().default(false),
  emergency: z.boolean().default(false),
  heroImage: z.string().optional(),
  publishDate: z.date(),
  updateDate: z.date(),
  pricing: z.object({
    min: z.number(),
    max: z.number(),
    unit: z.string(),
    note: z.string().optional(),
  }).optional(),
  faq: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).optional(),
  relatedServices: z.array(z.string()).default([]),
  ctaPrimary: z.string().default('Demander un devis gratuit'),
  ctaSecondary: z.string().default('Appeler maintenant'),
});

const articleSchema = z.object({
  title: z.string(),
  metaTitle: z.string().max(60),
  metaDescription: z.string().max(160),
  keyword: z.string(),
  excerpt: z.string(),
  publishDate: z.date(),
  updateDate: z.date(),
  author: z.string().default('Fouad Moussaoui'),
  category: z.enum(['diagnostic', 'guide', 'conseil', 'saisonnier']),
  heroImage: z.string().optional(),
  relatedServices: z.array(z.string()).default([]),
});

const communeSchema = z.object({
  name: z.string(),
  postalCode: z.string(),
  metaTitle: z.string().max(60),
  metaDescription: z.string().max(160),
  population: z.number().optional(),
  distanceFromColomiers: z.number(),
  responseTime: z.string(),
  highlights: z.array(z.string()),
  publishDate: z.date(),
  updateDate: z.date(),
});

const marqueSchema = z.object({
  name: z.string(),
  logo: z.string(),
  metaTitle: z.string().max(60),
  metaDescription: z.string().max(160),
  description: z.string(),
  models: z.array(z.string()),
  warranty: z.string(),
  certifiedInstaller: z.boolean().default(false),
  publishDate: z.date(),
  updateDate: z.date(),
});

export const collections = {
  'services-plomberie': defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/services-plomberie' }),
    schema: serviceSchema,
  }),
  'services-chauffage': defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/services-chauffage' }),
    schema: serviceSchema,
  }),
  'services-climatisation': defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/services-climatisation' }),
    schema: serviceSchema,
  }),
  'aides': defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/aides' }),
    schema: serviceSchema,
  }),
  'marques': defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/marques' }),
    schema: marqueSchema,
  }),
  'communes': defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/communes' }),
    schema: communeSchema,
  }),
  'articles': defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/articles' }),
    schema: articleSchema,
  }),
};

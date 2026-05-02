# Database Schema: Investor-First Forum (MVP)

Este esquema define la estructura de base de datos para un foro de bolsa de alta calidad, optimizado para PostgreSQL/Supabase.

## 1. Profiles (Extension of auth.users)
Almacena la información pública y reputación de los usuarios.
- `id`: uuid, references auth.users (primary key)
- `username`: text (unique, min 3 chars)
- `display_name`: text
- `avatar_url`: text
- `bio`: text (max 160 chars)
- `website`: text
- `karma`: integer (default: 0) - Puntos de reputación.
- `is_premium`: boolean (default: false)
- `created_at`: timestamp with time zone

## 2. Assets (Stocks/Tickers)
Lista de empresas del Mercado Continuo y BME Growth.
- `id`: uuid (primary key)
- `symbol`: text (unique) - Ej: 'ITX.MC', 'LLE.MC'
- `name`: text - Nombre de la empresa.
- `description`: text
- `sector`: text
- `market`: text - 'Continuo', 'BME Growth', 'IBEX 35'
- `is_active`: boolean (default: true)
- `last_price`: numeric (delayed/EOD)
- `updated_at`: timestamp with time zone

## 3. Posts (Threads/Tesis)
El contenido principal del foro.
- `id`: uuid (primary key)
- `author_id`: uuid, references profiles(id)
- `asset_id`: uuid, references assets(id) (null if general discussion)
- `title`: text (max 120 chars)
- `content`: text (markdown supported)
- `is_thesis`: boolean (default: false) - Para diferenciar análisis profundos de charla rápida.
- `slug`: text (unique) - Para SEO.
- `view_count`: integer (default: 0)
- `created_at`: timestamp with time zone
- `updated_at`: timestamp with time zone

## 4. Comments
Respuestas a los posts.
- `id`: uuid (primary key)
- `post_id`: uuid, references posts(id)
- `author_id`: uuid, references profiles(id)
- `parent_id`: uuid, references comments(id) (null if top-level) - Soporte para hilos anidados.
- `content`: text
- `created_at`: timestamp with time zone

## 5. Votes (Karma System)
Registro de votos para evitar spam y premiar calidad.
- `id`: uuid (primary key)
- `user_id`: uuid, references profiles(id)
- `post_id`: uuid, references posts(id) (optional)
- `comment_id`: uuid, references comments(id) (optional)
- `vote_type`: smallint (1 para upvote, -1 para downvote)
- `created_at`: timestamp with time zone
- UNIQUE(user_id, post_id)
- UNIQUE(user_id, comment_id)

## 6. Bookmarks (Saved Info)
Permite a los usuarios guardar información relevante.
- `id`: uuid (primary key)
- `user_id`: uuid, references profiles(id)
- `post_id`: uuid, references posts(id)
- `created_at`: timestamp with time zone
- UNIQUE(user_id, post_id)

## 7. Asset_Follows
Para notificaciones y feed personalizado.
- `user_id`: uuid, references profiles(id)
- `asset_id`: uuid, references assets(id)
- PRIMARY KEY (user_id, asset_id)

---

## SQL Raw (Para ejecución en Supabase SQL Editor)
```sql
-- Create profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  karma INTEGER DEFAULT 0,
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create assets table
CREATE TABLE public.assets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  symbol TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  sector TEXT,
  market TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  last_price NUMERIC,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create posts table
CREATE TABLE public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  asset_id UUID REFERENCES public.assets(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_thesis BOOLEAN DEFAULT FALSE,
  slug TEXT UNIQUE NOT NULL,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create comments table
CREATE TABLE public.comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Indices for performance
CREATE INDEX idx_posts_asset_id ON public.posts(asset_id);
CREATE INDEX idx_posts_created_at ON public.posts(created_at DESC);
CREATE INDEX idx_comments_post_id ON public.comments(post_id);
CREATE INDEX idx_assets_symbol ON public.assets(symbol);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_posts_modtime BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_assets_modtime BEFORE UPDATE ON public.assets FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

---

### Notas de diseño para tus agentes de IA:

1.  **Profiles vs Auth.Users:** He mantenido la separación clásica de Supabase. El agente debe saber que cuando un usuario se registra en `auth.users`, un disparador (*trigger*) debería crear el perfil en `public.profiles`.
2.  **SEO & Slugs:** He añadido el campo `slug` en la tabla de `posts`. Jules debería generar este slug automáticamente a partir del título para asegurar que las URLs sean amigables para Google.
3.  **Filtrado de Tesis:** El booleano `is_thesis` es crítico. En el frontend, esto te permitirá tener una pestaña de "Análisis Pro" separada del ruido general.
4.  **Soft Deletes:** No he incluido *soft deletes* por ahora para mantener el MVP simple, pero es algo a considerar en el futuro.
--
-- PostgreSQL database dump
--

\restrict hFOTBXpCx5bh0aGrFRQNyiklE0WGXBRpIc1xc2g72mLAxjLpeQHV7aNotLDNmaB

-- Dumped from database version 16.13 (Homebrew)
-- Dumped by pg_dump version 16.13 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: waist_measurements; Type: TABLE; Schema: public; Owner: emmamendez
--

CREATE TABLE public.waist_measurements (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    waist_value numeric(5,2),
    source text DEFAULT 'wearable'::text,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.waist_measurements OWNER TO emmamendez;

--
-- Data for Name: waist_measurements; Type: TABLE DATA; Schema: public; Owner: emmamendez
--

COPY public.waist_measurements (id, user_id, waist_value, source, created_at) FROM stdin;
99001f2f-bfff-48de-addd-45e3ecacbd0b	11111111-1111-1111-1111-111111111111	32.70	wearable	2026-03-31 20:49:45.503808
3fed0f6a-9dae-4ff4-bc50-7f1f8fd9ca43	11111111-1111-1111-1111-111111111111	32.70	wearable	2026-03-31 22:14:18.840477
\.


--
-- Name: waist_measurements waist_measurements_pkey; Type: CONSTRAINT; Schema: public; Owner: emmamendez
--

ALTER TABLE ONLY public.waist_measurements
    ADD CONSTRAINT waist_measurements_pkey PRIMARY KEY (id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO klps_app;


--
-- Name: TABLE waist_measurements; Type: ACL; Schema: public; Owner: emmamendez
--

GRANT SELECT,INSERT ON TABLE public.waist_measurements TO klps_app;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: emmamendez
--

ALTER DEFAULT PRIVILEGES FOR ROLE emmamendez IN SCHEMA public GRANT SELECT,INSERT ON TABLES TO klps_app;


--
-- PostgreSQL database dump complete
--

\unrestrict hFOTBXpCx5bh0aGrFRQNyiklE0WGXBRpIc1xc2g72mLAxjLpeQHV7aNotLDNmaB


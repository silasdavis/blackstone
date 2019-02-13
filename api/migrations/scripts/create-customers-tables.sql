--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.11
-- Dumped by pg_dump version 11.1

-- Started on 2019-02-08 13:17:43 EST

-- SET statement_timeout = 0;
-- SET lock_timeout = 0;
-- SET idle_in_transaction_session_timeout = 0;
-- SET client_encoding = 'UTF8';
-- SET standard_conforming_strings = on;
-- SELECT pg_catalog.set_config('search_path', '', false);
-- SET check_function_bodies = false;
-- SET client_min_messages = warning;
-- SET row_security = off;

--
-- TOC entry 9 (class 2615 OID 16671)
-- Name: customers; Type: SCHEMA; Schema: -; Owner: -
--

-- The initdb.js script should be creating the customers schema.
-- If the schema is not there the migration should fail fast.
-- CREATE SCHEMA IF NOT EXISTS "customers";


--
-- TOC entry 238 (class 1255 OID 16821)
-- Name: trigger_set_activated_timestamp(); Type: FUNCTION; Schema: customers; Owner: -
--

CREATE OR REPLACE FUNCTION "customers"."trigger_set_activated_timestamp"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$ BEGIN NEW.activated_at = NOW(); RETURN NEW; END; $$;


--
-- TOC entry 237 (class 1255 OID 16740)
-- Name: trigger_set_timestamp(); Type: FUNCTION; Schema: customers; Owner: -
--

CREATE OR REPLACE FUNCTION "customers"."trigger_set_timestamp"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$;


SET default_with_oids = false;

--
-- TOC entry 232 (class 1259 OID 16774)
-- Name: activity_details; Type: TABLE; Schema: customers; Owner: -
--

CREATE TABLE IF NOT EXISTS "customers"."activity_details" (
    "model_id" character varying(255) NOT NULL,
    "process_id" character varying(255) NOT NULL,
    "activity_id" character varying(255) NOT NULL,
    "activity_name" character varying(255) NOT NULL,
    "process_name" character varying(255) NOT NULL
);


--
-- TOC entry 234 (class 1259 OID 16784)
-- Name: organizations; Type: TABLE; Schema: customers; Owner: -
--

CREATE TABLE IF NOT EXISTS "customers"."organizations" (
    "id" integer NOT NULL,
    "address" character varying(255) NOT NULL,
    "name" character varying(255) NOT NULL
);


--
-- TOC entry 233 (class 1259 OID 16782)
-- Name: organizations_id_seq; Type: SEQUENCE; Schema: customers; Owner: -
--

CREATE SEQUENCE IF NOT EXISTS "customers"."organizations_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2350 (class 0 OID 0)
-- Dependencies: 233
-- Name: organizations_id_seq; Type: SEQUENCE OWNED BY; Schema: customers; Owner: -
--

ALTER SEQUENCE "customers"."organizations_id_seq" OWNED BY "customers"."organizations"."id";


--
-- TOC entry 230 (class 1259 OID 16699)
-- Name: password_change_requests; Type: TABLE; Schema: customers; Owner: -
--

CREATE TABLE IF NOT EXISTS "customers"."password_change_requests" (
    "id" integer NOT NULL,
    "user_id" integer NOT NULL,
    "recovery_code_digest" character varying NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL
);


--
-- TOC entry 229 (class 1259 OID 16697)
-- Name: password_change_requests_id_seq; Type: SEQUENCE; Schema: customers; Owner: -
--

CREATE SEQUENCE IF NOT EXISTS "customers"."password_change_requests_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2351 (class 0 OID 0)
-- Dependencies: 229
-- Name: password_change_requests_id_seq; Type: SEQUENCE OWNED BY; Schema: customers; Owner: -
--

ALTER SEQUENCE "customers"."password_change_requests_id_seq" OWNED BY "customers"."password_change_requests"."id";


--
-- TOC entry 231 (class 1259 OID 16766)
-- Name: process_details; Type: TABLE; Schema: customers; Owner: -
--

CREATE TABLE IF NOT EXISTS "customers"."process_details" (
    "model_id" character varying(255) NOT NULL,
    "process_id" character varying(255) NOT NULL,
    "process_name" character varying(255) NOT NULL
);


--
-- TOC entry 236 (class 1259 OID 16825)
-- Name: user_activation_requests; Type: TABLE; Schema: customers; Owner: -
--

CREATE TABLE IF NOT EXISTS "customers"."user_activation_requests" (
    "id" integer NOT NULL,
    "user_id" integer NOT NULL,
    "activation_code_digest" character varying NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL
);


--
-- TOC entry 235 (class 1259 OID 16823)
-- Name: user_activation_requests_id_seq; Type: SEQUENCE; Schema: customers; Owner: -
--

CREATE SEQUENCE IF NOT EXISTS "customers"."user_activation_requests_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2352 (class 0 OID 0)
-- Dependencies: 235
-- Name: user_activation_requests_id_seq; Type: SEQUENCE OWNED BY; Schema: customers; Owner: -
--

ALTER SEQUENCE "customers"."user_activation_requests_id_seq" OWNED BY "customers"."user_activation_requests"."id";


--
-- TOC entry 228 (class 1259 OID 16682)
-- Name: users; Type: TABLE; Schema: customers; Owner: -
--

CREATE TABLE IF NOT EXISTS "customers"."users" (
    "id" integer NOT NULL,
    "address" character varying(255) NOT NULL,
    "email" character varying(255),
    "password_digest" character varying(255) NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "username" character varying(255),
    "first_name" character varying,
    "last_name" character varying,
    "country" character varying,
    "region" character varying,
    "is_producer" boolean DEFAULT false NOT NULL,
    "onboarding" boolean DEFAULT true NOT NULL,
    "external_user" boolean DEFAULT false NOT NULL,
    "activated" boolean DEFAULT false NOT NULL,
    "activated_at" timestamp without time zone
);


--
-- TOC entry 227 (class 1259 OID 16680)
-- Name: users_id_seq; Type: SEQUENCE; Schema: customers; Owner: -
--

CREATE SEQUENCE IF NOT EXISTS "customers"."users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2353 (class 0 OID 0)
-- Dependencies: 227
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: customers; Owner: -
--

ALTER SEQUENCE "customers"."users_id_seq" OWNED BY "customers"."users"."id";


--
-- TOC entry 2194 (class 2604 OID 16787)
-- Name: organizations id; Type: DEFAULT; Schema: customers; Owner: -
--

ALTER TABLE IF EXISTS ONLY "customers"."organizations" ALTER COLUMN "id" SET DEFAULT "nextval"('"customers"."organizations_id_seq"'::"regclass");


--
-- TOC entry 2192 (class 2604 OID 16702)
-- Name: password_change_requests id; Type: DEFAULT; Schema: customers; Owner: -
--

ALTER TABLE IF EXISTS ONLY "customers"."password_change_requests" ALTER COLUMN "id" SET DEFAULT "nextval"('"customers"."password_change_requests_id_seq"'::"regclass");


--
-- TOC entry 2195 (class 2604 OID 16828)
-- Name: user_activation_requests id; Type: DEFAULT; Schema: customers; Owner: -
--

ALTER TABLE IF EXISTS ONLY "customers"."user_activation_requests" ALTER COLUMN "id" SET DEFAULT "nextval"('"customers"."user_activation_requests_id_seq"'::"regclass");


--
-- TOC entry 2185 (class 2604 OID 16685)
-- Name: users id; Type: DEFAULT; Schema: customers; Owner: -
--

ALTER TABLE IF EXISTS ONLY "customers"."users" ALTER COLUMN "id" SET DEFAULT "nextval"('"customers"."users_id_seq"'::"regclass");


--
-- TOC entry 2212 (class 2606 OID 16781)
-- Name: activity_details activity_details_pkey; Type: CONSTRAINT; Schema: customers; Owner: -
--

ALTER TABLE IF EXISTS ONLY "customers"."activity_details" DROP CONSTRAINT IF EXISTS "activity_details_pkey";
ALTER TABLE IF EXISTS ONLY "customers"."activity_details" ADD CONSTRAINT "activity_details_pkey" PRIMARY KEY ("model_id", "process_id", "activity_id");


--
-- TOC entry 2215 (class 2606 OID 16794)
-- Name: organizations organizations_address_key; Type: CONSTRAINT; Schema: customers; Owner: -
--
ALTER TABLE IF EXISTS ONLY "customers"."organizations" DROP CONSTRAINT IF EXISTS "organizations_address_key";
ALTER TABLE IF EXISTS ONLY "customers"."organizations" ADD CONSTRAINT "organizations_address_key" UNIQUE ("address");



--
-- TOC entry 2217 (class 2606 OID 16792)
-- Name: organizations organizations_pkey; Type: CONSTRAINT; Schema: customers; Owner: -
--
ALTER TABLE IF EXISTS ONLY "customers"."organizations" DROP CONSTRAINT IF EXISTS "organizations_pkey";
ALTER TABLE IF EXISTS ONLY "customers"."organizations" ADD CONSTRAINT "organizations_pkey" PRIMARY KEY ("id");

--
-- TOC entry 2204 (class 2606 OID 16708)
-- Name: password_change_requests password_change_requests_pkey; Type: CONSTRAINT; Schema: customers; Owner: -
--

ALTER TABLE IF EXISTS ONLY "customers"."password_change_requests" DROP CONSTRAINT IF EXISTS "password_change_requests_pkey";
ALTER TABLE IF EXISTS ONLY "customers"."password_change_requests" ADD CONSTRAINT "password_change_requests_pkey" PRIMARY KEY ("id");


--
-- TOC entry 2206 (class 2606 OID 16712)
-- Name: password_change_requests password_change_requests_recovery_code_digest_key; Type: CONSTRAINT; Schema: customers; Owner: -
--

ALTER TABLE IF EXISTS ONLY "customers"."password_change_requests" DROP CONSTRAINT IF EXISTS "password_change_requests_recovery_code_digest_key";
ALTER TABLE IF EXISTS ONLY "customers"."password_change_requests" ADD CONSTRAINT "password_change_requests_recovery_code_digest_key" UNIQUE ("recovery_code_digest");


--
-- TOC entry 2208 (class 2606 OID 16710)
-- Name: password_change_requests password_change_requests_user_id_key; Type: CONSTRAINT; Schema: customers; Owner: -
--

ALTER TABLE IF EXISTS ONLY "customers"."password_change_requests" DROP CONSTRAINT IF EXISTS "password_change_requests_user_id_key";
ALTER TABLE IF EXISTS ONLY "customers"."password_change_requests" ADD CONSTRAINT "password_change_requests_user_id_key" UNIQUE ("user_id");


--
-- TOC entry 2210 (class 2606 OID 16773)
-- Name: process_details process_details_pkey; Type: CONSTRAINT; Schema: customers; Owner: -
--

ALTER TABLE IF EXISTS ONLY "customers"."process_details" DROP CONSTRAINT IF EXISTS "process_details_pkey";
ALTER TABLE IF EXISTS ONLY "customers"."process_details" ADD CONSTRAINT "process_details_pkey" PRIMARY KEY ("model_id", "process_id");


--
-- TOC entry 2219 (class 2606 OID 16838)
-- Name: user_activation_requests user_activation_requests_activation_code_digest_key; Type: CONSTRAINT; Schema: customers; Owner: -
--

ALTER TABLE IF EXISTS ONLY "customers"."user_activation_requests" DROP CONSTRAINT IF EXISTS "user_activation_requests_activation_code_digest_key";
ALTER TABLE IF EXISTS ONLY "customers"."user_activation_requests" ADD CONSTRAINT "user_activation_requests_activation_code_digest_key" UNIQUE ("activation_code_digest");


--
-- TOC entry 2221 (class 2606 OID 16834)
-- Name: user_activation_requests user_activation_requests_pkey; Type: CONSTRAINT; Schema: customers; Owner: -
--

ALTER TABLE IF EXISTS ONLY "customers"."user_activation_requests" DROP CONSTRAINT IF EXISTS "user_activation_requests_pkey";
ALTER TABLE IF EXISTS ONLY "customers"."user_activation_requests" ADD CONSTRAINT "user_activation_requests_pkey" PRIMARY KEY ("id");


--
-- TOC entry 2223 (class 2606 OID 16836)
-- Name: user_activation_requests user_activation_requests_user_id_key; Type: CONSTRAINT; Schema: customers; Owner: -
--

ALTER TABLE IF EXISTS ONLY "customers"."user_activation_requests" DROP CONSTRAINT IF EXISTS "user_activation_requests_user_id_key";
ALTER TABLE IF EXISTS ONLY "customers"."user_activation_requests" ADD CONSTRAINT "user_activation_requests_user_id_key" UNIQUE ("user_id");


--
-- TOC entry 2198 (class 2606 OID 16692)
-- Name: users users_address_key; Type: CONSTRAINT; Schema: customers; Owner: -
--

ALTER TABLE IF EXISTS ONLY "customers"."users" DROP CONSTRAINT IF EXISTS "users_address_key";;
ALTER TABLE IF EXISTS ONLY "customers"."users" ADD CONSTRAINT "users_address_key" UNIQUE ("address");


--
-- TOC entry 2201 (class 2606 OID 16690)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: customers; Owner: -
--

ALTER TABLE IF EXISTS ONLY "customers"."users" DROP CONSTRAINT IF EXISTS "users_pkey" CASCADE;
ALTER TABLE IF EXISTS ONLY "customers"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");


--
-- TOC entry 2213 (class 1259 OID 16795)
-- Name: organizationsIndex_address; Type: INDEX; Schema: customers; Owner: -
--

CREATE UNIQUE INDEX IF NOT EXISTS "organizationsIndex_address" ON "customers"."organizations" USING "btree" ("address");


--
-- TOC entry 2199 (class 1259 OID 16797)
-- Name: users_email_lower_idx; Type: INDEX; Schema: customers; Owner: -
--

CREATE UNIQUE INDEX IF NOT EXISTS "users_email_lower_idx" ON "customers"."users" USING "btree" ("lower"(("email")::"text"));


--
-- TOC entry 2202 (class 1259 OID 16809)
-- Name: users_username_lower_idx; Type: INDEX; Schema: customers; Owner: -
--

CREATE UNIQUE INDEX IF NOT EXISTS "users_username_lower_idx" ON "customers"."users" USING "btree" ("lower"(("username")::"text"));


--
-- TOC entry 2227 (class 2620 OID 16822)
-- Name: users set_activated_timestamp; Type: TRIGGER; Schema: customers; Owner: -
--
DROP TRIGGER IF EXISTS set_activated_timestamp ON "customers"."users";
CREATE TRIGGER "set_activated_timestamp" BEFORE UPDATE ON "customers"."users" FOR EACH ROW WHEN (("new"."activated" = true)) EXECUTE PROCEDURE "customers"."trigger_set_activated_timestamp"();


--
-- TOC entry 2226 (class 2620 OID 16741)
-- Name: users set_timestamp; Type: TRIGGER; Schema: customers; Owner: -
--
DROP TRIGGER IF EXISTS set_timestamp ON "customers"."users";
CREATE TRIGGER "set_timestamp" BEFORE UPDATE ON "customers"."users" FOR EACH ROW EXECUTE PROCEDURE "customers"."trigger_set_timestamp"();


--
-- TOC entry 2225 (class 2606 OID 16839)
-- Name: user_activation_requests activation_requests_user_id_fk; Type: FK CONSTRAINT; Schema: customers; Owner: -
--

ALTER TABLE IF EXISTS ONLY "customers"."user_activation_requests" DROP CONSTRAINT IF EXISTS "activation_requests_user_id_fk";
ALTER TABLE IF EXISTS ONLY "customers"."user_activation_requests"
    ADD CONSTRAINT "activation_requests_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "customers"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2224 (class 2606 OID 16713)
-- Name: password_change_requests password_change_requests_user_id_fk; Type: FK CONSTRAINT; Schema: customers; Owner: -
--

ALTER TABLE IF EXISTS ONLY "customers"."password_change_requests" DROP CONSTRAINT IF EXISTS "password_change_requests_user_id_fk";
ALTER TABLE IF EXISTS ONLY "customers"."password_change_requests"
    ADD CONSTRAINT "password_change_requests_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "customers"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2019-02-08 13:17:43 EST

--
-- PostgreSQL database dump complete
--


--
-- PostgreSQL database dump
--

-- Dumped from database version 14.15 (Homebrew)
-- Dumped by pg_dump version 14.15 (Homebrew)

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
-- Name: lime_answer_l10ns; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_answer_l10ns (
    id integer NOT NULL,
    aid integer NOT NULL,
    answer text NOT NULL,
    language character varying(20) NOT NULL
);


ALTER TABLE public.lime_answer_l10ns OWNER TO postgres;

--
-- Name: lime_answer_l10ns_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_answer_l10ns_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_answer_l10ns_id_seq OWNER TO postgres;

--
-- Name: lime_answer_l10ns_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_answer_l10ns_id_seq OWNED BY public.lime_answer_l10ns.id;


--
-- Name: lime_answers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_answers (
    aid integer NOT NULL,
    qid integer NOT NULL,
    code character varying(5) NOT NULL,
    sortorder integer NOT NULL,
    assessment_value integer DEFAULT 0 NOT NULL,
    scale_id integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.lime_answers OWNER TO postgres;

--
-- Name: lime_answers_aid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_answers_aid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_answers_aid_seq OWNER TO postgres;

--
-- Name: lime_answers_aid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_answers_aid_seq OWNED BY public.lime_answers.aid;


--
-- Name: lime_archived_table_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_archived_table_settings (
    id integer NOT NULL,
    survey_id integer NOT NULL,
    user_id integer NOT NULL,
    tbl_name character varying(255) NOT NULL,
    tbl_type character varying(10) NOT NULL,
    created timestamp without time zone NOT NULL,
    properties text NOT NULL,
    attributes text
);


ALTER TABLE public.lime_archived_table_settings OWNER TO postgres;

--
-- Name: lime_archived_table_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_archived_table_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_archived_table_settings_id_seq OWNER TO postgres;

--
-- Name: lime_archived_table_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_archived_table_settings_id_seq OWNED BY public.lime_archived_table_settings.id;


--
-- Name: lime_assessments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_assessments (
    id integer NOT NULL,
    sid integer DEFAULT 0 NOT NULL,
    scope character varying(5) NOT NULL,
    gid integer DEFAULT 0 NOT NULL,
    name text NOT NULL,
    minimum character varying(50) NOT NULL,
    maximum character varying(50) NOT NULL,
    message text NOT NULL,
    language character varying(20) DEFAULT 'en'::character varying NOT NULL
);


ALTER TABLE public.lime_assessments OWNER TO postgres;

--
-- Name: lime_assessments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_assessments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_assessments_id_seq OWNER TO postgres;

--
-- Name: lime_assessments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_assessments_id_seq OWNED BY public.lime_assessments.id;


--
-- Name: lime_asset_version; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_asset_version (
    id integer NOT NULL,
    path text NOT NULL,
    version integer NOT NULL
);


ALTER TABLE public.lime_asset_version OWNER TO postgres;

--
-- Name: lime_asset_version_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_asset_version_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_asset_version_id_seq OWNER TO postgres;

--
-- Name: lime_asset_version_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_asset_version_id_seq OWNED BY public.lime_asset_version.id;


--
-- Name: lime_boxes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_boxes (
    id integer NOT NULL,
    "position" integer,
    url text NOT NULL,
    title text NOT NULL,
    buttontext character varying(255),
    ico character varying(255),
    "desc" text NOT NULL,
    page text NOT NULL,
    usergroup integer NOT NULL
);


ALTER TABLE public.lime_boxes OWNER TO postgres;

--
-- Name: lime_boxes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_boxes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_boxes_id_seq OWNER TO postgres;

--
-- Name: lime_boxes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_boxes_id_seq OWNED BY public.lime_boxes.id;


--
-- Name: lime_conditions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_conditions (
    cid integer NOT NULL,
    qid integer DEFAULT 0 NOT NULL,
    cqid integer DEFAULT 0 NOT NULL,
    cfieldname character varying(50) DEFAULT ''::character varying NOT NULL,
    method character varying(5) DEFAULT ''::character varying NOT NULL,
    value character varying(255) DEFAULT ''::character varying NOT NULL,
    scenario integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.lime_conditions OWNER TO postgres;

--
-- Name: lime_conditions_cid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_conditions_cid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_conditions_cid_seq OWNER TO postgres;

--
-- Name: lime_conditions_cid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_conditions_cid_seq OWNED BY public.lime_conditions.cid;


--
-- Name: lime_defaultvalue_l10ns; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_defaultvalue_l10ns (
    id integer NOT NULL,
    dvid integer DEFAULT 0 NOT NULL,
    language character varying(20) NOT NULL,
    defaultvalue text
);


ALTER TABLE public.lime_defaultvalue_l10ns OWNER TO postgres;

--
-- Name: lime_defaultvalue_l10ns_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_defaultvalue_l10ns_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_defaultvalue_l10ns_id_seq OWNER TO postgres;

--
-- Name: lime_defaultvalue_l10ns_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_defaultvalue_l10ns_id_seq OWNED BY public.lime_defaultvalue_l10ns.id;


--
-- Name: lime_defaultvalues; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_defaultvalues (
    dvid integer NOT NULL,
    qid integer DEFAULT 0 NOT NULL,
    scale_id integer DEFAULT 0 NOT NULL,
    sqid integer DEFAULT 0 NOT NULL,
    specialtype character varying(20) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE public.lime_defaultvalues OWNER TO postgres;

--
-- Name: lime_defaultvalues_dvid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_defaultvalues_dvid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_defaultvalues_dvid_seq OWNER TO postgres;

--
-- Name: lime_defaultvalues_dvid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_defaultvalues_dvid_seq OWNED BY public.lime_defaultvalues.dvid;


--
-- Name: lime_expression_errors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_expression_errors (
    id integer NOT NULL,
    errortime character varying(50),
    sid integer,
    gid integer,
    qid integer,
    gseq integer,
    qseq integer,
    type character varying(50),
    eqn text,
    prettyprint text
);


ALTER TABLE public.lime_expression_errors OWNER TO postgres;

--
-- Name: lime_expression_errors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_expression_errors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_expression_errors_id_seq OWNER TO postgres;

--
-- Name: lime_expression_errors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_expression_errors_id_seq OWNED BY public.lime_expression_errors.id;


--
-- Name: lime_failed_emails; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_failed_emails (
    id integer NOT NULL,
    surveyid integer NOT NULL,
    responseid integer NOT NULL,
    email_type character varying(200) NOT NULL,
    recipient character varying(320) NOT NULL,
    language character varying(20) DEFAULT 'en'::character varying NOT NULL,
    error_message text,
    created timestamp without time zone NOT NULL,
    status character varying(20) DEFAULT 'SEND FAILED'::character varying,
    updated timestamp without time zone,
    resend_vars text NOT NULL
);


ALTER TABLE public.lime_failed_emails OWNER TO postgres;

--
-- Name: lime_failed_emails_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_failed_emails_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_failed_emails_id_seq OWNER TO postgres;

--
-- Name: lime_failed_emails_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_failed_emails_id_seq OWNED BY public.lime_failed_emails.id;


--
-- Name: lime_failed_login_attempts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_failed_login_attempts (
    id integer NOT NULL,
    ip character varying(40) NOT NULL,
    last_attempt character varying(20) NOT NULL,
    number_attempts integer NOT NULL,
    is_frontend boolean NOT NULL
);


ALTER TABLE public.lime_failed_login_attempts OWNER TO postgres;

--
-- Name: lime_failed_login_attempts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_failed_login_attempts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_failed_login_attempts_id_seq OWNER TO postgres;

--
-- Name: lime_failed_login_attempts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_failed_login_attempts_id_seq OWNED BY public.lime_failed_login_attempts.id;


--
-- Name: lime_group_l10ns; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_group_l10ns (
    id integer NOT NULL,
    gid integer NOT NULL,
    group_name text NOT NULL,
    description text,
    language character varying(20) NOT NULL
);


ALTER TABLE public.lime_group_l10ns OWNER TO postgres;

--
-- Name: lime_group_l10ns_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_group_l10ns_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_group_l10ns_id_seq OWNER TO postgres;

--
-- Name: lime_group_l10ns_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_group_l10ns_id_seq OWNED BY public.lime_group_l10ns.id;


--
-- Name: lime_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_groups (
    gid integer NOT NULL,
    sid integer DEFAULT 0 NOT NULL,
    group_order integer DEFAULT 0 NOT NULL,
    randomization_group character varying(20) DEFAULT ''::character varying NOT NULL,
    grelevance text
);


ALTER TABLE public.lime_groups OWNER TO postgres;

--
-- Name: lime_groups_gid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_groups_gid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_groups_gid_seq OWNER TO postgres;

--
-- Name: lime_groups_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_groups_gid_seq OWNED BY public.lime_groups.gid;


--
-- Name: lime_label_l10ns; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_label_l10ns (
    id integer NOT NULL,
    label_id integer NOT NULL,
    title text,
    language character varying(20) DEFAULT 'en'::character varying NOT NULL
);


ALTER TABLE public.lime_label_l10ns OWNER TO postgres;

--
-- Name: lime_label_l10ns_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_label_l10ns_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_label_l10ns_id_seq OWNER TO postgres;

--
-- Name: lime_label_l10ns_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_label_l10ns_id_seq OWNED BY public.lime_label_l10ns.id;


--
-- Name: lime_labels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_labels (
    id integer NOT NULL,
    lid integer DEFAULT 0 NOT NULL,
    code character varying(20) DEFAULT ''::character varying NOT NULL,
    sortorder integer NOT NULL,
    assessment_value integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.lime_labels OWNER TO postgres;

--
-- Name: lime_labels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_labels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_labels_id_seq OWNER TO postgres;

--
-- Name: lime_labels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_labels_id_seq OWNED BY public.lime_labels.id;


--
-- Name: lime_labelsets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_labelsets (
    lid integer NOT NULL,
    owner_id integer,
    label_name character varying(100) DEFAULT ''::character varying NOT NULL,
    languages character varying(255) NOT NULL
);


ALTER TABLE public.lime_labelsets OWNER TO postgres;

--
-- Name: lime_labelsets_lid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_labelsets_lid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_labelsets_lid_seq OWNER TO postgres;

--
-- Name: lime_labelsets_lid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_labelsets_lid_seq OWNED BY public.lime_labelsets.lid;


--
-- Name: lime_map_tutorial_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_map_tutorial_users (
    tid integer NOT NULL,
    uid integer NOT NULL,
    taken integer DEFAULT 1
);


ALTER TABLE public.lime_map_tutorial_users OWNER TO postgres;

--
-- Name: lime_message; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_message (
    id integer NOT NULL,
    language character varying(50) DEFAULT ''::character varying NOT NULL,
    translation text
);


ALTER TABLE public.lime_message OWNER TO postgres;

--
-- Name: lime_notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_notifications (
    id integer NOT NULL,
    entity character varying(15) NOT NULL,
    entity_id integer NOT NULL,
    title character varying(255) NOT NULL,
    message text NOT NULL,
    status character varying(15) DEFAULT 'new'::character varying NOT NULL,
    importance integer DEFAULT 1 NOT NULL,
    display_class character varying(31) DEFAULT 'default'::character varying,
    hash character varying(64),
    created timestamp without time zone,
    first_read timestamp without time zone
);


ALTER TABLE public.lime_notifications OWNER TO postgres;

--
-- Name: lime_notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_notifications_id_seq OWNER TO postgres;

--
-- Name: lime_notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_notifications_id_seq OWNED BY public.lime_notifications.id;


--
-- Name: lime_participant_attribute; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_participant_attribute (
    participant_id character varying(50) NOT NULL,
    attribute_id integer NOT NULL,
    value text NOT NULL
);


ALTER TABLE public.lime_participant_attribute OWNER TO postgres;

--
-- Name: lime_participant_attribute_names; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_participant_attribute_names (
    attribute_id integer NOT NULL,
    attribute_type character varying(4) NOT NULL,
    defaultname character varying(255) NOT NULL,
    visible character varying(5) NOT NULL,
    encrypted character varying(5) NOT NULL,
    core_attribute character varying(5) NOT NULL
);


ALTER TABLE public.lime_participant_attribute_names OWNER TO postgres;

--
-- Name: lime_participant_attribute_names_attribute_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_participant_attribute_names_attribute_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_participant_attribute_names_attribute_id_seq OWNER TO postgres;

--
-- Name: lime_participant_attribute_names_attribute_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_participant_attribute_names_attribute_id_seq OWNED BY public.lime_participant_attribute_names.attribute_id;


--
-- Name: lime_participant_attribute_names_lang; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_participant_attribute_names_lang (
    attribute_id integer NOT NULL,
    attribute_name character varying(255) NOT NULL,
    lang character varying(20) NOT NULL
);


ALTER TABLE public.lime_participant_attribute_names_lang OWNER TO postgres;

--
-- Name: lime_participant_attribute_values; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_participant_attribute_values (
    value_id integer NOT NULL,
    attribute_id integer NOT NULL,
    value text NOT NULL
);


ALTER TABLE public.lime_participant_attribute_values OWNER TO postgres;

--
-- Name: lime_participant_attribute_values_value_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_participant_attribute_values_value_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_participant_attribute_values_value_id_seq OWNER TO postgres;

--
-- Name: lime_participant_attribute_values_value_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_participant_attribute_values_value_id_seq OWNED BY public.lime_participant_attribute_values.value_id;


--
-- Name: lime_participant_shares; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_participant_shares (
    participant_id character varying(50) NOT NULL,
    share_uid integer NOT NULL,
    date_added timestamp without time zone NOT NULL,
    can_edit character varying(5) NOT NULL
);


ALTER TABLE public.lime_participant_shares OWNER TO postgres;

--
-- Name: lime_participants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_participants (
    participant_id character varying(50) NOT NULL,
    firstname text,
    lastname text,
    email text,
    language character varying(40),
    blacklisted character varying(1) NOT NULL,
    owner_uid integer NOT NULL,
    created_by integer NOT NULL,
    created timestamp without time zone,
    modified timestamp without time zone
);


ALTER TABLE public.lime_participants OWNER TO postgres;

--
-- Name: lime_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_permissions (
    id integer NOT NULL,
    entity character varying(50) NOT NULL,
    entity_id integer NOT NULL,
    uid integer NOT NULL,
    permission character varying(100) NOT NULL,
    create_p integer DEFAULT 0 NOT NULL,
    read_p integer DEFAULT 0 NOT NULL,
    update_p integer DEFAULT 0 NOT NULL,
    delete_p integer DEFAULT 0 NOT NULL,
    import_p integer DEFAULT 0 NOT NULL,
    export_p integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.lime_permissions OWNER TO postgres;

--
-- Name: lime_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_permissions_id_seq OWNER TO postgres;

--
-- Name: lime_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_permissions_id_seq OWNED BY public.lime_permissions.id;


--
-- Name: lime_permissiontemplates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_permissiontemplates (
    ptid integer NOT NULL,
    name character varying(127) NOT NULL,
    description text,
    renewed_last timestamp without time zone,
    created_at timestamp without time zone NOT NULL,
    created_by integer NOT NULL
);


ALTER TABLE public.lime_permissiontemplates OWNER TO postgres;

--
-- Name: lime_permissiontemplates_ptid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_permissiontemplates_ptid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_permissiontemplates_ptid_seq OWNER TO postgres;

--
-- Name: lime_permissiontemplates_ptid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_permissiontemplates_ptid_seq OWNED BY public.lime_permissiontemplates.ptid;


--
-- Name: lime_plugin_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_plugin_settings (
    id integer NOT NULL,
    plugin_id integer NOT NULL,
    model character varying(50),
    model_id integer,
    key character varying(50) NOT NULL,
    value text
);


ALTER TABLE public.lime_plugin_settings OWNER TO postgres;

--
-- Name: lime_plugin_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_plugin_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_plugin_settings_id_seq OWNER TO postgres;

--
-- Name: lime_plugin_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_plugin_settings_id_seq OWNED BY public.lime_plugin_settings.id;


--
-- Name: lime_plugins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_plugins (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    plugin_type character varying(6) DEFAULT 'user'::character varying,
    active integer DEFAULT 0 NOT NULL,
    priority integer DEFAULT 0 NOT NULL,
    version character varying(32),
    load_error integer DEFAULT 0,
    load_error_message text
);


ALTER TABLE public.lime_plugins OWNER TO postgres;

--
-- Name: lime_plugins_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_plugins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_plugins_id_seq OWNER TO postgres;

--
-- Name: lime_plugins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_plugins_id_seq OWNED BY public.lime_plugins.id;


--
-- Name: lime_question_attributes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_question_attributes (
    qaid integer NOT NULL,
    qid integer DEFAULT 0 NOT NULL,
    attribute character varying(50),
    value text,
    language character varying(20)
);


ALTER TABLE public.lime_question_attributes OWNER TO postgres;

--
-- Name: lime_question_attributes_qaid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_question_attributes_qaid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_question_attributes_qaid_seq OWNER TO postgres;

--
-- Name: lime_question_attributes_qaid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_question_attributes_qaid_seq OWNED BY public.lime_question_attributes.qaid;


--
-- Name: lime_question_l10ns; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_question_l10ns (
    id integer NOT NULL,
    qid integer NOT NULL,
    question text NOT NULL,
    help text,
    script text,
    language character varying(20) NOT NULL
);


ALTER TABLE public.lime_question_l10ns OWNER TO postgres;

--
-- Name: lime_question_l10ns_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_question_l10ns_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_question_l10ns_id_seq OWNER TO postgres;

--
-- Name: lime_question_l10ns_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_question_l10ns_id_seq OWNED BY public.lime_question_l10ns.id;


--
-- Name: lime_question_themes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_question_themes (
    id integer NOT NULL,
    name character varying(150) NOT NULL,
    visible character varying(1),
    xml_path character varying(255),
    image_path character varying(255),
    title character varying(100) NOT NULL,
    creation_date timestamp without time zone,
    author character varying(150),
    author_email character varying(255),
    author_url character varying(255),
    copyright text,
    license text,
    version character varying(45),
    api_version character varying(45) NOT NULL,
    description text,
    last_update timestamp without time zone,
    owner_id integer,
    theme_type character varying(150),
    question_type character varying(150) NOT NULL,
    core_theme boolean,
    extends character varying(150),
    "group" character varying(150),
    settings text
);


ALTER TABLE public.lime_question_themes OWNER TO postgres;

--
-- Name: lime_question_themes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_question_themes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_question_themes_id_seq OWNER TO postgres;

--
-- Name: lime_question_themes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_question_themes_id_seq OWNED BY public.lime_question_themes.id;


--
-- Name: lime_questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_questions (
    qid integer NOT NULL,
    parent_qid integer DEFAULT 0 NOT NULL,
    sid integer DEFAULT 0 NOT NULL,
    gid integer DEFAULT 0 NOT NULL,
    type character varying(30) DEFAULT 'T'::character varying NOT NULL,
    title character varying(20) DEFAULT ''::character varying NOT NULL,
    preg text,
    other character varying(1) DEFAULT 'N'::character varying NOT NULL,
    mandatory character varying(1),
    encrypted character varying(1) DEFAULT 'N'::character varying,
    question_order integer NOT NULL,
    scale_id integer DEFAULT 0 NOT NULL,
    same_default integer DEFAULT 0 NOT NULL,
    relevance text,
    question_theme_name character varying(150),
    modulename character varying(255),
    same_script integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.lime_questions OWNER TO postgres;

--
-- Name: lime_questions_qid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_questions_qid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_questions_qid_seq OWNER TO postgres;

--
-- Name: lime_questions_qid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_questions_qid_seq OWNED BY public.lime_questions.qid;


--
-- Name: lime_quota; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_quota (
    id integer NOT NULL,
    sid integer,
    name character varying(255),
    qlimit integer,
    action integer,
    active integer DEFAULT 1 NOT NULL,
    autoload_url integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.lime_quota OWNER TO postgres;

--
-- Name: lime_quota_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_quota_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_quota_id_seq OWNER TO postgres;

--
-- Name: lime_quota_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_quota_id_seq OWNED BY public.lime_quota.id;


--
-- Name: lime_quota_languagesettings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_quota_languagesettings (
    quotals_id integer NOT NULL,
    quotals_quota_id integer DEFAULT 0 NOT NULL,
    quotals_language character varying(45) DEFAULT 'en'::character varying NOT NULL,
    quotals_name character varying(255),
    quotals_message text NOT NULL,
    quotals_url character varying(255),
    quotals_urldescrip character varying(255)
);


ALTER TABLE public.lime_quota_languagesettings OWNER TO postgres;

--
-- Name: lime_quota_languagesettings_quotals_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_quota_languagesettings_quotals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_quota_languagesettings_quotals_id_seq OWNER TO postgres;

--
-- Name: lime_quota_languagesettings_quotals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_quota_languagesettings_quotals_id_seq OWNED BY public.lime_quota_languagesettings.quotals_id;


--
-- Name: lime_quota_members; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_quota_members (
    id integer NOT NULL,
    sid integer,
    qid integer,
    quota_id integer,
    code character varying(11)
);


ALTER TABLE public.lime_quota_members OWNER TO postgres;

--
-- Name: lime_quota_members_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_quota_members_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_quota_members_id_seq OWNER TO postgres;

--
-- Name: lime_quota_members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_quota_members_id_seq OWNED BY public.lime_quota_members.id;


--
-- Name: lime_saved_control; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_saved_control (
    scid integer NOT NULL,
    sid integer DEFAULT 0 NOT NULL,
    srid integer DEFAULT 0 NOT NULL,
    identifier text NOT NULL,
    access_code text NOT NULL,
    email character varying(192),
    ip text NOT NULL,
    saved_thisstep text NOT NULL,
    status character varying(1) DEFAULT ''::character varying NOT NULL,
    saved_date timestamp without time zone NOT NULL,
    refurl text
);


ALTER TABLE public.lime_saved_control OWNER TO postgres;

--
-- Name: lime_saved_control_scid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_saved_control_scid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_saved_control_scid_seq OWNER TO postgres;

--
-- Name: lime_saved_control_scid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_saved_control_scid_seq OWNED BY public.lime_saved_control.scid;


--
-- Name: lime_sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_sessions (
    id character varying(32) NOT NULL,
    expire integer,
    data bytea
);


ALTER TABLE public.lime_sessions OWNER TO postgres;

--
-- Name: lime_settings_global; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_settings_global (
    stg_name character varying(50) DEFAULT ''::character varying NOT NULL,
    stg_value text NOT NULL
);


ALTER TABLE public.lime_settings_global OWNER TO postgres;

--
-- Name: lime_settings_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_settings_user (
    id integer NOT NULL,
    uid integer NOT NULL,
    entity character varying(15),
    entity_id character varying(31),
    stg_name character varying(63) NOT NULL,
    stg_value text
);


ALTER TABLE public.lime_settings_user OWNER TO postgres;

--
-- Name: lime_settings_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_settings_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_settings_user_id_seq OWNER TO postgres;

--
-- Name: lime_settings_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_settings_user_id_seq OWNED BY public.lime_settings_user.id;


--
-- Name: lime_source_message; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_source_message (
    id integer NOT NULL,
    category character varying(35),
    message text
);


ALTER TABLE public.lime_source_message OWNER TO postgres;

--
-- Name: lime_source_message_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_source_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_source_message_id_seq OWNER TO postgres;

--
-- Name: lime_source_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_source_message_id_seq OWNED BY public.lime_source_message.id;


--
-- Name: lime_survey_641746; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_survey_641746 (
    id integer NOT NULL,
    token character varying(36),
    submitdate timestamp without time zone,
    lastpage integer,
    startlanguage character varying(20) NOT NULL,
    seed character varying(31),
    startdate timestamp without time zone NOT NULL,
    datestamp timestamp without time zone NOT NULL,
    ipaddr text,
    refurl text,
    "641746X3X5" text,
    "641746X4X6" text,
    "641746X5X7" text
);


ALTER TABLE public.lime_survey_641746 OWNER TO postgres;

--
-- Name: lime_survey_641746_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_survey_641746_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_survey_641746_id_seq OWNER TO postgres;

--
-- Name: lime_survey_641746_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_survey_641746_id_seq OWNED BY public.lime_survey_641746.id;


--
-- Name: lime_survey_641746_timings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_survey_641746_timings (
    id integer NOT NULL,
    interviewtime double precision,
    "641746X3time" double precision,
    "641746X3X5time" double precision,
    "641746X4time" double precision,
    "641746X4X6time" double precision,
    "641746X5time" double precision,
    "641746X5X7time" double precision
);


ALTER TABLE public.lime_survey_641746_timings OWNER TO postgres;

--
-- Name: lime_survey_641746_timings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_survey_641746_timings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_survey_641746_timings_id_seq OWNER TO postgres;

--
-- Name: lime_survey_641746_timings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_survey_641746_timings_id_seq OWNED BY public.lime_survey_641746_timings.id;


--
-- Name: lime_survey_links; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_survey_links (
    participant_id character varying(50) NOT NULL,
    token_id integer NOT NULL,
    survey_id integer NOT NULL,
    date_created timestamp without time zone,
    date_invited timestamp without time zone,
    date_completed timestamp without time zone
);


ALTER TABLE public.lime_survey_links OWNER TO postgres;

--
-- Name: lime_survey_url_parameters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_survey_url_parameters (
    id integer NOT NULL,
    sid integer NOT NULL,
    parameter character varying(50) NOT NULL,
    targetqid integer,
    targetsqid integer
);


ALTER TABLE public.lime_survey_url_parameters OWNER TO postgres;

--
-- Name: lime_survey_url_parameters_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_survey_url_parameters_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_survey_url_parameters_id_seq OWNER TO postgres;

--
-- Name: lime_survey_url_parameters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_survey_url_parameters_id_seq OWNED BY public.lime_survey_url_parameters.id;


--
-- Name: lime_surveymenu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_surveymenu (
    id integer NOT NULL,
    parent_id integer,
    survey_id integer,
    user_id integer,
    name character varying(128),
    ordering integer DEFAULT 0,
    level integer DEFAULT 0,
    title character varying(168) DEFAULT ''::character varying NOT NULL,
    "position" character varying(192) DEFAULT 'side'::character varying NOT NULL,
    description text,
    showincollapse integer DEFAULT 0,
    active integer DEFAULT 0 NOT NULL,
    changed_at timestamp without time zone,
    changed_by integer DEFAULT 0 NOT NULL,
    created_at timestamp without time zone,
    created_by integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.lime_surveymenu OWNER TO postgres;

--
-- Name: lime_surveymenu_entries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_surveymenu_entries (
    id integer NOT NULL,
    menu_id integer,
    user_id integer,
    ordering integer DEFAULT 0,
    name character varying(168) DEFAULT ''::character varying,
    title character varying(168) DEFAULT ''::character varying NOT NULL,
    menu_title character varying(168) DEFAULT ''::character varying NOT NULL,
    menu_description text,
    menu_icon character varying(192) DEFAULT ''::character varying NOT NULL,
    menu_icon_type character varying(192) DEFAULT ''::character varying NOT NULL,
    menu_class character varying(192) DEFAULT ''::character varying NOT NULL,
    menu_link character varying(192) DEFAULT ''::character varying NOT NULL,
    action character varying(192) DEFAULT ''::character varying NOT NULL,
    template character varying(192) DEFAULT ''::character varying NOT NULL,
    partial character varying(192) DEFAULT ''::character varying NOT NULL,
    classes character varying(192) DEFAULT ''::character varying NOT NULL,
    permission character varying(192) DEFAULT ''::character varying NOT NULL,
    permission_grade character varying(192),
    data text,
    getdatamethod character varying(192) DEFAULT ''::character varying NOT NULL,
    language character varying(32) DEFAULT 'en-GB'::character varying NOT NULL,
    showincollapse integer DEFAULT 0,
    active integer DEFAULT 0 NOT NULL,
    changed_at timestamp without time zone,
    changed_by integer DEFAULT 0 NOT NULL,
    created_at timestamp without time zone,
    created_by integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.lime_surveymenu_entries OWNER TO postgres;

--
-- Name: lime_surveymenu_entries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_surveymenu_entries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_surveymenu_entries_id_seq OWNER TO postgres;

--
-- Name: lime_surveymenu_entries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_surveymenu_entries_id_seq OWNED BY public.lime_surveymenu_entries.id;


--
-- Name: lime_surveymenu_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_surveymenu_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_surveymenu_id_seq OWNER TO postgres;

--
-- Name: lime_surveymenu_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_surveymenu_id_seq OWNED BY public.lime_surveymenu.id;


--
-- Name: lime_surveys; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_surveys (
    sid integer NOT NULL,
    owner_id integer NOT NULL,
    gsid integer DEFAULT 1,
    admin character varying(50),
    active character varying(1) DEFAULT 'N'::character varying NOT NULL,
    expires timestamp without time zone,
    startdate timestamp without time zone,
    adminemail character varying(254),
    anonymized character varying(1) DEFAULT 'N'::character varying NOT NULL,
    format character varying(1),
    savetimings character varying(1) DEFAULT 'N'::character varying NOT NULL,
    template character varying(100) DEFAULT 'default'::character varying,
    language character varying(50),
    additional_languages text,
    datestamp character varying(1) DEFAULT 'N'::character varying NOT NULL,
    usecookie character varying(1) DEFAULT 'N'::character varying NOT NULL,
    allowregister character varying(1) DEFAULT 'N'::character varying NOT NULL,
    allowsave character varying(1) DEFAULT 'Y'::character varying NOT NULL,
    autonumber_start integer DEFAULT 0 NOT NULL,
    autoredirect character varying(1) DEFAULT 'N'::character varying NOT NULL,
    allowprev character varying(1) DEFAULT 'N'::character varying NOT NULL,
    printanswers character varying(1) DEFAULT 'N'::character varying NOT NULL,
    ipaddr character varying(1) DEFAULT 'N'::character varying NOT NULL,
    ipanonymize character varying(1) DEFAULT 'N'::character varying NOT NULL,
    refurl character varying(1) DEFAULT 'N'::character varying NOT NULL,
    datecreated timestamp without time zone,
    showsurveypolicynotice integer DEFAULT 0,
    publicstatistics character varying(1) DEFAULT 'N'::character varying NOT NULL,
    publicgraphs character varying(1) DEFAULT 'N'::character varying NOT NULL,
    listpublic character varying(1) DEFAULT 'N'::character varying NOT NULL,
    htmlemail character varying(1) DEFAULT 'Y'::character varying NOT NULL,
    sendconfirmation character varying(1) DEFAULT 'Y'::character varying NOT NULL,
    tokenanswerspersistence character varying(1) DEFAULT 'N'::character varying NOT NULL,
    assessments character varying(1) DEFAULT 'N'::character varying NOT NULL,
    usecaptcha character varying(1) DEFAULT 'N'::character varying NOT NULL,
    usetokens character varying(1) DEFAULT 'N'::character varying NOT NULL,
    bounce_email character varying(254),
    attributedescriptions text,
    emailresponseto text,
    emailnotificationto text,
    tokenlength integer DEFAULT 15 NOT NULL,
    showxquestions character varying(1) DEFAULT 'Y'::character varying,
    showgroupinfo character varying(1) DEFAULT 'B'::character varying,
    shownoanswer character varying(1) DEFAULT 'Y'::character varying,
    showqnumcode character varying(1) DEFAULT 'X'::character varying,
    bouncetime integer,
    bounceprocessing character varying(1) DEFAULT 'N'::character varying,
    bounceaccounttype character varying(4),
    bounceaccounthost character varying(200),
    bounceaccountpass text,
    bounceaccountencryption character varying(3),
    bounceaccountuser character varying(200),
    showwelcome character varying(1) DEFAULT 'Y'::character varying,
    showprogress character varying(1) DEFAULT 'Y'::character varying,
    questionindex integer DEFAULT 0 NOT NULL,
    navigationdelay integer DEFAULT 0 NOT NULL,
    nokeyboard character varying(1) DEFAULT 'N'::character varying,
    alloweditaftercompletion character varying(1) DEFAULT 'N'::character varying,
    googleanalyticsstyle character varying(1),
    googleanalyticsapikey character varying(25),
    tokenencryptionoptions text
);


ALTER TABLE public.lime_surveys OWNER TO postgres;

--
-- Name: lime_surveys_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_surveys_groups (
    gsid integer NOT NULL,
    name character varying(45) NOT NULL,
    title character varying(100),
    template character varying(128) DEFAULT 'default'::character varying,
    description text,
    sortorder integer NOT NULL,
    owner_id integer,
    parent_id integer,
    alwaysavailable boolean,
    created timestamp without time zone,
    modified timestamp without time zone,
    created_by integer NOT NULL
);


ALTER TABLE public.lime_surveys_groups OWNER TO postgres;

--
-- Name: lime_surveys_groups_gsid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_surveys_groups_gsid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_surveys_groups_gsid_seq OWNER TO postgres;

--
-- Name: lime_surveys_groups_gsid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_surveys_groups_gsid_seq OWNED BY public.lime_surveys_groups.gsid;


--
-- Name: lime_surveys_groupsettings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_surveys_groupsettings (
    gsid integer NOT NULL,
    owner_id integer,
    admin character varying(50) DEFAULT NULL::character varying,
    adminemail character varying(254) DEFAULT NULL::character varying,
    anonymized character varying(1) DEFAULT 'N'::character varying NOT NULL,
    format character varying(1) DEFAULT NULL::character varying,
    savetimings character varying(1) DEFAULT 'N'::character varying NOT NULL,
    template character varying(100) DEFAULT 'default'::character varying,
    datestamp character varying(1) DEFAULT 'N'::character varying NOT NULL,
    usecookie character varying(1) DEFAULT 'N'::character varying NOT NULL,
    allowregister character varying(1) DEFAULT 'N'::character varying NOT NULL,
    allowsave character varying(1) DEFAULT 'Y'::character varying NOT NULL,
    autonumber_start integer DEFAULT 0,
    autoredirect character varying(1) DEFAULT 'N'::character varying NOT NULL,
    allowprev character varying(1) DEFAULT 'N'::character varying NOT NULL,
    printanswers character varying(1) DEFAULT 'N'::character varying NOT NULL,
    ipaddr character varying(1) DEFAULT 'N'::character varying NOT NULL,
    ipanonymize character varying(1) DEFAULT 'N'::character varying NOT NULL,
    refurl character varying(1) DEFAULT 'N'::character varying NOT NULL,
    showsurveypolicynotice integer DEFAULT 0,
    publicstatistics character varying(1) DEFAULT 'N'::character varying NOT NULL,
    publicgraphs character varying(1) DEFAULT 'N'::character varying NOT NULL,
    listpublic character varying(1) DEFAULT 'N'::character varying NOT NULL,
    htmlemail character varying(1) DEFAULT 'Y'::character varying NOT NULL,
    sendconfirmation character varying(1) DEFAULT 'Y'::character varying NOT NULL,
    tokenanswerspersistence character varying(1) DEFAULT 'N'::character varying NOT NULL,
    assessments character varying(1) DEFAULT 'N'::character varying NOT NULL,
    usecaptcha character varying(1) DEFAULT 'N'::character varying NOT NULL,
    bounce_email character varying(254) DEFAULT NULL::character varying,
    attributedescriptions text,
    emailresponseto text,
    emailnotificationto text,
    tokenlength integer DEFAULT 15,
    showxquestions character varying(1) DEFAULT 'Y'::character varying,
    showgroupinfo character varying(1) DEFAULT 'B'::character varying,
    shownoanswer character varying(1) DEFAULT 'Y'::character varying,
    showqnumcode character varying(1) DEFAULT 'X'::character varying,
    showwelcome character varying(1) DEFAULT 'Y'::character varying,
    showprogress character varying(1) DEFAULT 'Y'::character varying,
    questionindex integer DEFAULT 0,
    navigationdelay integer DEFAULT 0,
    nokeyboard character varying(1) DEFAULT 'N'::character varying,
    alloweditaftercompletion character varying(1) DEFAULT 'N'::character varying
);


ALTER TABLE public.lime_surveys_groupsettings OWNER TO postgres;

--
-- Name: lime_surveys_languagesettings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_surveys_languagesettings (
    surveyls_survey_id integer NOT NULL,
    surveyls_language character varying(45) DEFAULT 'en'::character varying NOT NULL,
    surveyls_title character varying(200) NOT NULL,
    surveyls_description text,
    surveyls_welcometext text,
    surveyls_endtext text,
    surveyls_policy_notice text,
    surveyls_policy_error text,
    surveyls_policy_notice_label character varying(192),
    surveyls_url text,
    surveyls_urldescription character varying(255),
    surveyls_email_invite_subj character varying(255),
    surveyls_email_invite text,
    surveyls_email_remind_subj character varying(255),
    surveyls_email_remind text,
    surveyls_email_register_subj character varying(255),
    surveyls_email_register text,
    surveyls_email_confirm_subj character varying(255),
    surveyls_email_confirm text,
    surveyls_dateformat integer DEFAULT 1 NOT NULL,
    surveyls_attributecaptions text,
    surveyls_alias character varying(100),
    email_admin_notification_subj character varying(255),
    email_admin_notification text,
    email_admin_responses_subj character varying(255),
    email_admin_responses text,
    surveyls_numberformat integer DEFAULT 0 NOT NULL,
    attachments text
);


ALTER TABLE public.lime_surveys_languagesettings OWNER TO postgres;

--
-- Name: lime_template_configuration; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_template_configuration (
    id integer NOT NULL,
    template_name character varying(150) NOT NULL,
    sid integer,
    gsid integer,
    uid integer,
    files_css text,
    files_js text,
    files_print_css text,
    options text,
    cssframework_name character varying(45),
    cssframework_css text,
    cssframework_js text,
    packages_to_load text,
    packages_ltr text,
    packages_rtl text
);


ALTER TABLE public.lime_template_configuration OWNER TO postgres;

--
-- Name: lime_template_configuration_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_template_configuration_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_template_configuration_id_seq OWNER TO postgres;

--
-- Name: lime_template_configuration_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_template_configuration_id_seq OWNED BY public.lime_template_configuration.id;


--
-- Name: lime_templates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_templates (
    id integer NOT NULL,
    name character varying(150) NOT NULL,
    folder character varying(45),
    title character varying(100) NOT NULL,
    creation_date timestamp without time zone,
    author character varying(150),
    author_email character varying(255),
    author_url character varying(255),
    copyright text,
    license text,
    version character varying(45),
    api_version character varying(45) NOT NULL,
    view_folder character varying(45) NOT NULL,
    files_folder character varying(45) NOT NULL,
    description text,
    last_update timestamp without time zone,
    owner_id integer,
    extends character varying(150)
);


ALTER TABLE public.lime_templates OWNER TO postgres;

--
-- Name: lime_templates_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_templates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_templates_id_seq OWNER TO postgres;

--
-- Name: lime_templates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_templates_id_seq OWNED BY public.lime_templates.id;


--
-- Name: lime_tokens_641746; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_tokens_641746 (
    tid integer NOT NULL,
    participant_id character varying(50),
    firstname text,
    lastname text,
    email text,
    emailstatus text,
    token character varying(36),
    language character varying(25),
    blacklisted character varying(17),
    sent character varying(17) DEFAULT 'N'::character varying,
    remindersent character varying(17) DEFAULT 'N'::character varying,
    remindercount integer DEFAULT 0,
    completed character varying(17) DEFAULT 'N'::character varying,
    usesleft integer DEFAULT 1,
    validfrom timestamp without time zone,
    validuntil timestamp without time zone,
    mpid integer
);


ALTER TABLE public.lime_tokens_641746 OWNER TO postgres;

--
-- Name: lime_tokens_641746_tid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_tokens_641746_tid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_tokens_641746_tid_seq OWNER TO postgres;

--
-- Name: lime_tokens_641746_tid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_tokens_641746_tid_seq OWNED BY public.lime_tokens_641746.tid;


--
-- Name: lime_tutorial_entries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_tutorial_entries (
    teid integer NOT NULL,
    ordering integer,
    title text,
    content text,
    settings text
);


ALTER TABLE public.lime_tutorial_entries OWNER TO postgres;

--
-- Name: lime_tutorial_entries_teid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_tutorial_entries_teid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_tutorial_entries_teid_seq OWNER TO postgres;

--
-- Name: lime_tutorial_entries_teid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_tutorial_entries_teid_seq OWNED BY public.lime_tutorial_entries.teid;


--
-- Name: lime_tutorial_entry_relation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_tutorial_entry_relation (
    teid integer NOT NULL,
    tid integer NOT NULL,
    uid integer,
    sid integer
);


ALTER TABLE public.lime_tutorial_entry_relation OWNER TO postgres;

--
-- Name: lime_tutorials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_tutorials (
    tid integer NOT NULL,
    name character varying(128),
    title character varying(192),
    icon character varying(64),
    description text,
    active integer DEFAULT 0,
    settings text,
    permission character varying(128) NOT NULL,
    permission_grade character varying(128) NOT NULL
);


ALTER TABLE public.lime_tutorials OWNER TO postgres;

--
-- Name: lime_tutorials_tid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_tutorials_tid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_tutorials_tid_seq OWNER TO postgres;

--
-- Name: lime_tutorials_tid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_tutorials_tid_seq OWNED BY public.lime_tutorials.tid;


--
-- Name: lime_user_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_user_groups (
    ugid integer NOT NULL,
    name character varying(20) NOT NULL,
    description text NOT NULL,
    owner_id integer NOT NULL
);


ALTER TABLE public.lime_user_groups OWNER TO postgres;

--
-- Name: lime_user_groups_ugid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_user_groups_ugid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_user_groups_ugid_seq OWNER TO postgres;

--
-- Name: lime_user_groups_ugid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_user_groups_ugid_seq OWNED BY public.lime_user_groups.ugid;


--
-- Name: lime_user_in_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_user_in_groups (
    ugid integer NOT NULL,
    uid integer NOT NULL
);


ALTER TABLE public.lime_user_in_groups OWNER TO postgres;

--
-- Name: lime_user_in_permissionrole; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_user_in_permissionrole (
    ptid integer NOT NULL,
    uid integer NOT NULL
);


ALTER TABLE public.lime_user_in_permissionrole OWNER TO postgres;

--
-- Name: lime_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lime_users (
    uid integer NOT NULL,
    users_name character varying(64) DEFAULT ''::character varying NOT NULL,
    password text NOT NULL,
    full_name character varying(50) NOT NULL,
    parent_id integer NOT NULL,
    lang character varying(20),
    email character varying(192),
    htmleditormode character varying(7) DEFAULT 'default'::character varying,
    templateeditormode character varying(7) DEFAULT 'default'::character varying NOT NULL,
    questionselectormode character varying(7) DEFAULT 'default'::character varying NOT NULL,
    one_time_pw text,
    dateformat integer DEFAULT 1 NOT NULL,
    last_login timestamp without time zone,
    created timestamp without time zone,
    modified timestamp without time zone,
    validation_key character varying(38),
    validation_key_expiration timestamp without time zone,
    last_forgot_email_password timestamp without time zone,
    expires timestamp without time zone,
    user_status integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.lime_users OWNER TO postgres;

--
-- Name: lime_users_uid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lime_users_uid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lime_users_uid_seq OWNER TO postgres;

--
-- Name: lime_users_uid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lime_users_uid_seq OWNED BY public.lime_users.uid;


--
-- Name: lime_answer_l10ns id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_answer_l10ns ALTER COLUMN id SET DEFAULT nextval('public.lime_answer_l10ns_id_seq'::regclass);


--
-- Name: lime_answers aid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_answers ALTER COLUMN aid SET DEFAULT nextval('public.lime_answers_aid_seq'::regclass);


--
-- Name: lime_archived_table_settings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_archived_table_settings ALTER COLUMN id SET DEFAULT nextval('public.lime_archived_table_settings_id_seq'::regclass);


--
-- Name: lime_assessments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_assessments ALTER COLUMN id SET DEFAULT nextval('public.lime_assessments_id_seq'::regclass);


--
-- Name: lime_asset_version id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_asset_version ALTER COLUMN id SET DEFAULT nextval('public.lime_asset_version_id_seq'::regclass);


--
-- Name: lime_boxes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_boxes ALTER COLUMN id SET DEFAULT nextval('public.lime_boxes_id_seq'::regclass);


--
-- Name: lime_conditions cid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_conditions ALTER COLUMN cid SET DEFAULT nextval('public.lime_conditions_cid_seq'::regclass);


--
-- Name: lime_defaultvalue_l10ns id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_defaultvalue_l10ns ALTER COLUMN id SET DEFAULT nextval('public.lime_defaultvalue_l10ns_id_seq'::regclass);


--
-- Name: lime_defaultvalues dvid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_defaultvalues ALTER COLUMN dvid SET DEFAULT nextval('public.lime_defaultvalues_dvid_seq'::regclass);


--
-- Name: lime_expression_errors id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_expression_errors ALTER COLUMN id SET DEFAULT nextval('public.lime_expression_errors_id_seq'::regclass);


--
-- Name: lime_failed_emails id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_failed_emails ALTER COLUMN id SET DEFAULT nextval('public.lime_failed_emails_id_seq'::regclass);


--
-- Name: lime_failed_login_attempts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_failed_login_attempts ALTER COLUMN id SET DEFAULT nextval('public.lime_failed_login_attempts_id_seq'::regclass);


--
-- Name: lime_group_l10ns id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_group_l10ns ALTER COLUMN id SET DEFAULT nextval('public.lime_group_l10ns_id_seq'::regclass);


--
-- Name: lime_groups gid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_groups ALTER COLUMN gid SET DEFAULT nextval('public.lime_groups_gid_seq'::regclass);


--
-- Name: lime_label_l10ns id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_label_l10ns ALTER COLUMN id SET DEFAULT nextval('public.lime_label_l10ns_id_seq'::regclass);


--
-- Name: lime_labels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_labels ALTER COLUMN id SET DEFAULT nextval('public.lime_labels_id_seq'::regclass);


--
-- Name: lime_labelsets lid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_labelsets ALTER COLUMN lid SET DEFAULT nextval('public.lime_labelsets_lid_seq'::regclass);


--
-- Name: lime_notifications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_notifications ALTER COLUMN id SET DEFAULT nextval('public.lime_notifications_id_seq'::regclass);


--
-- Name: lime_participant_attribute_names attribute_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_participant_attribute_names ALTER COLUMN attribute_id SET DEFAULT nextval('public.lime_participant_attribute_names_attribute_id_seq'::regclass);


--
-- Name: lime_participant_attribute_values value_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_participant_attribute_values ALTER COLUMN value_id SET DEFAULT nextval('public.lime_participant_attribute_values_value_id_seq'::regclass);


--
-- Name: lime_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_permissions ALTER COLUMN id SET DEFAULT nextval('public.lime_permissions_id_seq'::regclass);


--
-- Name: lime_permissiontemplates ptid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_permissiontemplates ALTER COLUMN ptid SET DEFAULT nextval('public.lime_permissiontemplates_ptid_seq'::regclass);


--
-- Name: lime_plugin_settings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_plugin_settings ALTER COLUMN id SET DEFAULT nextval('public.lime_plugin_settings_id_seq'::regclass);


--
-- Name: lime_plugins id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_plugins ALTER COLUMN id SET DEFAULT nextval('public.lime_plugins_id_seq'::regclass);


--
-- Name: lime_question_attributes qaid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_question_attributes ALTER COLUMN qaid SET DEFAULT nextval('public.lime_question_attributes_qaid_seq'::regclass);


--
-- Name: lime_question_l10ns id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_question_l10ns ALTER COLUMN id SET DEFAULT nextval('public.lime_question_l10ns_id_seq'::regclass);


--
-- Name: lime_question_themes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_question_themes ALTER COLUMN id SET DEFAULT nextval('public.lime_question_themes_id_seq'::regclass);


--
-- Name: lime_questions qid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_questions ALTER COLUMN qid SET DEFAULT nextval('public.lime_questions_qid_seq'::regclass);


--
-- Name: lime_quota id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_quota ALTER COLUMN id SET DEFAULT nextval('public.lime_quota_id_seq'::regclass);


--
-- Name: lime_quota_languagesettings quotals_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_quota_languagesettings ALTER COLUMN quotals_id SET DEFAULT nextval('public.lime_quota_languagesettings_quotals_id_seq'::regclass);


--
-- Name: lime_quota_members id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_quota_members ALTER COLUMN id SET DEFAULT nextval('public.lime_quota_members_id_seq'::regclass);


--
-- Name: lime_saved_control scid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_saved_control ALTER COLUMN scid SET DEFAULT nextval('public.lime_saved_control_scid_seq'::regclass);


--
-- Name: lime_settings_user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_settings_user ALTER COLUMN id SET DEFAULT nextval('public.lime_settings_user_id_seq'::regclass);


--
-- Name: lime_source_message id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_source_message ALTER COLUMN id SET DEFAULT nextval('public.lime_source_message_id_seq'::regclass);


--
-- Name: lime_survey_641746 id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_survey_641746 ALTER COLUMN id SET DEFAULT nextval('public.lime_survey_641746_id_seq'::regclass);


--
-- Name: lime_survey_641746_timings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_survey_641746_timings ALTER COLUMN id SET DEFAULT nextval('public.lime_survey_641746_timings_id_seq'::regclass);


--
-- Name: lime_survey_url_parameters id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_survey_url_parameters ALTER COLUMN id SET DEFAULT nextval('public.lime_survey_url_parameters_id_seq'::regclass);


--
-- Name: lime_surveymenu id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_surveymenu ALTER COLUMN id SET DEFAULT nextval('public.lime_surveymenu_id_seq'::regclass);


--
-- Name: lime_surveymenu_entries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_surveymenu_entries ALTER COLUMN id SET DEFAULT nextval('public.lime_surveymenu_entries_id_seq'::regclass);


--
-- Name: lime_surveys_groups gsid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_surveys_groups ALTER COLUMN gsid SET DEFAULT nextval('public.lime_surveys_groups_gsid_seq'::regclass);


--
-- Name: lime_template_configuration id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_template_configuration ALTER COLUMN id SET DEFAULT nextval('public.lime_template_configuration_id_seq'::regclass);


--
-- Name: lime_templates id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_templates ALTER COLUMN id SET DEFAULT nextval('public.lime_templates_id_seq'::regclass);


--
-- Name: lime_tokens_641746 tid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_tokens_641746 ALTER COLUMN tid SET DEFAULT nextval('public.lime_tokens_641746_tid_seq'::regclass);


--
-- Name: lime_tutorial_entries teid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_tutorial_entries ALTER COLUMN teid SET DEFAULT nextval('public.lime_tutorial_entries_teid_seq'::regclass);


--
-- Name: lime_tutorials tid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_tutorials ALTER COLUMN tid SET DEFAULT nextval('public.lime_tutorials_tid_seq'::regclass);


--
-- Name: lime_user_groups ugid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_user_groups ALTER COLUMN ugid SET DEFAULT nextval('public.lime_user_groups_ugid_seq'::regclass);


--
-- Name: lime_users uid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_users ALTER COLUMN uid SET DEFAULT nextval('public.lime_users_uid_seq'::regclass);


--
-- Data for Name: lime_answer_l10ns; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_answer_l10ns (id, aid, answer, language) FROM stdin;
\.


--
-- Data for Name: lime_answers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_answers (aid, qid, code, sortorder, assessment_value, scale_id) FROM stdin;
\.


--
-- Data for Name: lime_archived_table_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_archived_table_settings (id, survey_id, user_id, tbl_name, tbl_type, created, properties, attributes) FROM stdin;
\.


--
-- Data for Name: lime_assessments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_assessments (id, sid, scope, gid, name, minimum, maximum, message, language) FROM stdin;
\.


--
-- Data for Name: lime_asset_version; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_asset_version (id, path, version) FROM stdin;
\.


--
-- Data for Name: lime_boxes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_boxes (id, "position", url, title, buttontext, ico, "desc", page, usergroup) FROM stdin;
1	1	surveyAdministration/newSurvey	Create survey	Create survey	ri-add-line	Create a new survey from scratch. Or simply copy or import an existing survey.	welcome	-2
2	2	surveyAdministration/listsurveys	List surveys	\N	ri-list-unordered	List available surveys	welcome	-1
3	3	admin/globalsettings	Global settings	View global settings	ri-settings-5-line	Edit global settings	welcome	-2
4	4	userManagement/index	Manage survey administrators	Manage administrators	ri-user-line	The user management allows you to add additional users to your survey administration.	welcome	-2
5	5	admin/labels/sa/view	Label sets	Edit label sets	ri-price-tag-3-line	Label sets can be used as answer options or subquestions to speed up creation of similar questions.	welcome	-2
6	6	themeOptions	Themes	Edit themes	ri-brush-line	The themes functionality allows you to edit survey-, admin- or question themes.	welcome	-2
\.


--
-- Data for Name: lime_conditions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_conditions (cid, qid, cqid, cfieldname, method, value, scenario) FROM stdin;
\.


--
-- Data for Name: lime_defaultvalue_l10ns; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_defaultvalue_l10ns (id, dvid, language, defaultvalue) FROM stdin;
\.


--
-- Data for Name: lime_defaultvalues; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_defaultvalues (dvid, qid, scale_id, sqid, specialtype) FROM stdin;
\.


--
-- Data for Name: lime_expression_errors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_expression_errors (id, errortime, sid, gid, qid, gseq, qseq, type, eqn, prettyprint) FROM stdin;
\.


--
-- Data for Name: lime_failed_emails; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_failed_emails (id, surveyid, responseid, email_type, recipient, language, error_message, created, status, updated, resend_vars) FROM stdin;
\.


--
-- Data for Name: lime_failed_login_attempts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_failed_login_attempts (id, ip, last_attempt, number_attempts, is_frontend) FROM stdin;
2	::1	2024-12-25 21:04:59	1	t
\.


--
-- Data for Name: lime_group_l10ns; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_group_l10ns (id, gid, group_name, description, language) FROM stdin;
3	3	Biggest Frustration	What is your biggest frustration when wearing underwear	en
4	4	Top Priority Feature	"If you could design your perfect pair of underwear, what’s the most important feature?"	en
5	5	Emotional Impact	"How does wearing the right underwear make you feel?"	en
\.


--
-- Data for Name: lime_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_groups (gid, sid, group_order, randomization_group, grelevance) FROM stdin;
3	641746	1		
4	641746	2		
5	641746	3		
\.


--
-- Data for Name: lime_label_l10ns; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_label_l10ns (id, label_id, title, language) FROM stdin;
\.


--
-- Data for Name: lime_labels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_labels (id, lid, code, sortorder, assessment_value) FROM stdin;
\.


--
-- Data for Name: lime_labelsets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_labelsets (lid, owner_id, label_name, languages) FROM stdin;
\.


--
-- Data for Name: lime_map_tutorial_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_map_tutorial_users (tid, uid, taken) FROM stdin;
\.


--
-- Data for Name: lime_message; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_message (id, language, translation) FROM stdin;
\.


--
-- Data for Name: lime_notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_notifications (id, entity, entity_id, title, message, status, importance, display_class, hash, created, first_read) FROM stdin;
2	user	1	LimeSurvey theme editor	Welcome to the theme editor of LimeSurvey. To get an overview of new functionality and possibilities, please visit the <a target="_blank" href="https://www.limesurvey.org/manual/New_Template_System_in_LS3.x"> LimeSurvey manual </a>. For further questions and information, feel free to post your questions on the <a target="_blank" href="https://forums.limesurvey.org"> LimeSurvey forums </a>.	read	1	default	cc022f8a696b7f4c549b9a7670618a19dea61847e8c523caabfa0e40bad1fc99	2024-12-22 10:00:31.685194	2024-12-22 10:01:02
1	user	1	SSL not enforced	<span class="ri-error-warning-fill"></span>&nbsp;Warning: Please enforce SSL encryption in Global settings/Security after SSL is properly configured for your webserver.	new	1	default	e874527c8f54934f3f3f6078ca5b9399c7cca002dc8398e92fcd20628c3e51bb	2024-12-17 13:27:48.061851	2024-12-25 00:03:39
\.


--
-- Data for Name: lime_participant_attribute; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_participant_attribute (participant_id, attribute_id, value) FROM stdin;
\.


--
-- Data for Name: lime_participant_attribute_names; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_participant_attribute_names (attribute_id, attribute_type, defaultname, visible, encrypted, core_attribute) FROM stdin;
1	TB	firstname	TRUE	Y	Y
2	TB	lastname	TRUE	Y	Y
3	TB	email	TRUE	Y	Y
\.


--
-- Data for Name: lime_participant_attribute_names_lang; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_participant_attribute_names_lang (attribute_id, attribute_name, lang) FROM stdin;
\.


--
-- Data for Name: lime_participant_attribute_values; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_participant_attribute_values (value_id, attribute_id, value) FROM stdin;
\.


--
-- Data for Name: lime_participant_shares; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_participant_shares (participant_id, share_uid, date_added, can_edit) FROM stdin;
\.


--
-- Data for Name: lime_participants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_participants (participant_id, firstname, lastname, email, language, blacklisted, owner_uid, created_by, created, modified) FROM stdin;
\.


--
-- Data for Name: lime_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_permissions (id, entity, entity_id, uid, permission, create_p, read_p, update_p, delete_p, import_p, export_p) FROM stdin;
1	global	0	1	superadmin	0	1	0	0	0	0
2	survey	641746	1	assessments	1	1	1	1	0	0
3	survey	641746	1	quotas	1	1	1	1	0	0
4	survey	641746	1	responses	1	1	1	1	1	1
5	survey	641746	1	statistics	0	1	0	0	0	0
6	survey	641746	1	survey	0	1	0	1	0	0
7	survey	641746	1	surveyactivation	0	0	1	0	0	0
8	survey	641746	1	surveycontent	1	1	1	1	1	1
9	survey	641746	1	surveylocale	0	1	1	0	0	0
10	survey	641746	1	surveysecurity	1	1	1	1	0	0
11	survey	641746	1	surveysettings	0	1	1	0	0	0
12	survey	641746	1	tokens	1	1	1	1	1	1
13	survey	641746	1	translations	0	1	1	0	0	0
\.


--
-- Data for Name: lime_permissiontemplates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_permissiontemplates (ptid, name, description, renewed_last, created_at, created_by) FROM stdin;
\.


--
-- Data for Name: lime_plugin_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_plugin_settings (id, plugin_id, model, model_id, key, value) FROM stdin;
1	1	\N	\N	next_extension_update_check	"2024-12-26 00:18:54"
\.


--
-- Data for Name: lime_plugins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_plugins (id, name, plugin_type, active, priority, version, load_error, load_error_message) FROM stdin;
1	UpdateCheck	core	1	0	1.0.0	0	\N
3	ComfortUpdateChecker	core	1	0	1.0.0	0	\N
4	Authdb	core	1	0	1.0.0	0	\N
5	AuthLDAP	core	0	0	1.0.0	0	\N
6	AuditLog	core	0	0	1.0.0	0	\N
7	Authwebserver	core	0	0	1.0.0	0	\N
8	ExportR	core	1	0	1.0.0	0	\N
9	ExportSTATAxml	core	1	0	1.0.0	0	\N
15	customToken	core	0	0	1.0.1	0	\N
16	mailSenderToFrom	core	0	0	1.0.0	0	\N
17	TwoFactorAdminLogin	core	0	0	1.2.5	0	\N
2	PasswordRequirement	core	1	0	1.1.0	0	\N
10	ExportSPSSsav	core	1	0	1.0.4	0	\N
11	oldUrlCompat	core	0	0	1.0.1	0	\N
12	expressionQuestionHelp	core	0	0	1.0.1	0	\N
13	expressionQuestionForAll	core	0	0	1.0.1	0	\N
14	expressionFixedDbVar	core	0	0	1.0.2	0	\N
\.


--
-- Data for Name: lime_question_attributes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_question_attributes (qaid, qid, attribute, value, language) FROM stdin;
94	5	random_group		
95	5	em_validation_q		
96	5	em_validation_q_tip		en
97	5	hide_tip	0	
98	5	text_input_width		
99	5	input_size		
100	5	display_rows		
101	5	hidden	0	
102	5	cssclass		
103	5	maximum_chars		
104	5	page_break	0	
105	5	time_limit		
106	5	time_limit_action	1	
107	5	time_limit_disable_next	0	
108	5	time_limit_disable_prev	0	
109	5	time_limit_countdown_message		en
110	5	time_limit_timer_style		
111	5	time_limit_message_delay		
112	5	time_limit_message		en
113	5	time_limit_message_style		
114	5	time_limit_warning		
115	5	time_limit_warning_display_time		
116	5	time_limit_warning_message		en
117	5	time_limit_warning_style		
118	5	time_limit_warning_2		
119	5	time_limit_warning_2_display_time		
120	5	time_limit_warning_2_message		en
121	5	time_limit_warning_2_style		
122	5	statistics_showgraph	1	
123	5	statistics_graphtype	0	
124	5	save_as_default	N	
125	6	random_group		
126	6	em_validation_q		
127	6	em_validation_q_tip		en
128	6	hide_tip	0	
129	6	text_input_width		
130	6	input_size		
131	6	display_rows		
132	6	hidden	0	
133	6	cssclass		
134	6	maximum_chars		
135	6	page_break	0	
136	6	time_limit		
137	6	time_limit_action	1	
138	6	time_limit_disable_next	0	
139	6	time_limit_disable_prev	0	
140	6	time_limit_countdown_message		en
141	6	time_limit_timer_style		
142	6	time_limit_message_delay		
143	6	time_limit_message		en
144	6	time_limit_message_style		
145	6	time_limit_warning		
146	6	time_limit_warning_display_time		
147	6	time_limit_warning_message		en
148	6	time_limit_warning_style		
149	6	time_limit_warning_2		
150	6	time_limit_warning_2_display_time		
151	6	time_limit_warning_2_message		en
152	6	time_limit_warning_2_style		
153	6	statistics_showgraph	1	
154	6	statistics_graphtype	0	
155	6	save_as_default	N	
156	7	random_group		
157	7	em_validation_q		
158	7	em_validation_q_tip		en
159	7	hide_tip	0	
160	7	text_input_width		
161	7	input_size		
162	7	display_rows		
163	7	hidden	0	
164	7	cssclass		
165	7	maximum_chars		
166	7	page_break	0	
167	7	time_limit		
168	7	time_limit_action	1	
169	7	time_limit_disable_next	0	
170	7	time_limit_disable_prev	0	
171	7	time_limit_countdown_message		en
172	7	time_limit_timer_style		
173	7	time_limit_message_delay		
174	7	time_limit_message		en
175	7	time_limit_message_style		
176	7	time_limit_warning		
177	7	time_limit_warning_display_time		
178	7	time_limit_warning_message		en
179	7	time_limit_warning_style		
180	7	time_limit_warning_2		
181	7	time_limit_warning_2_display_time		
182	7	time_limit_warning_2_message		en
183	7	time_limit_warning_2_style		
184	7	statistics_showgraph	1	
185	7	statistics_graphtype	0	
186	7	save_as_default	N	
\.


--
-- Data for Name: lime_question_l10ns; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_question_l10ns (id, qid, question, help, script, language) FROM stdin;
3	3	What is your biggest frustration when wearing underwear?"<br /><em>Possible Responses:</em> Predefined options like “Doesn’t stay in place,” “Uncomfortable fabric,” “Not breathable.”			en
4	4	<p>If you could design your perfect pair of underwear, what’s the most important feature?"<br /><em>Possible Responses:</em> “Breathability,” “Stretchability,” “Seamless design.”</p>\r\n			en
5	5	<p><em>Possible Responses:</em> i.e. like “Doesn’t stay in place,” “Uncomfortable fabric,” “Not breathable.”</p>\r\n			en
6	6	<em>Possible Responses: i.e.</em> “Breathability,” “Stretchability,” “Seamless design.”			en
7	7	<em>Possible Responses:</em> i.e. “Confident,” “Relaxed,” “Empowered.”			en
\.


--
-- Data for Name: lime_question_themes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_question_themes (id, name, visible, xml_path, image_path, title, creation_date, author, author_email, author_url, copyright, license, version, api_version, description, last_update, owner_id, theme_type, question_type, core_theme, extends, "group", settings) FROM stdin;
1	5pointchoice	Y	application/views/survey/questions/answer/5pointchoice	/assets/images/screenshots/5.png	5 point choice	2018-09-08 00:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	5 point choice question type configuration	2019-09-23 15:05:59	1	question_theme	5	t		Single choice questions	{"subquestions":"0","answerscales":"0","hasdefaultvalues":"0","assessable":"0","class":"choice-5-pt-radio"}
2	arrays/10point	Y	application/views/survey/questions/answer/arrays/10point	/assets/images/screenshots/B.png	Array (10 point choice)	2018-09-08 00:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	Array (10 point choice) question type configuration	2019-09-23 15:05:59	1	question_theme	B	t		Arrays	{"subquestions":"1","answerscales":"0","hasdefaultvalues":"0","assessable":"1","class":"array-10-pt"}
3	arrays/5point	Y	application/views/survey/questions/answer/arrays/5point	/assets/images/screenshots/A.png	Array (5 point choice)	2018-09-08 00:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	Array (5 point choice) question type configuration	2019-09-23 15:05:59	1	question_theme	A	t		Arrays	{"subquestions":"1","answerscales":"0","hasdefaultvalues":"0","assessable":"1","class":"array-5-pt"}
4	arrays/array	Y	application/views/survey/questions/answer/arrays/array	/assets/images/screenshots/F.png	Array	2018-09-08 00:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	Array question type configuration	2019-09-23 15:05:59	1	question_theme	F	t		Arrays	{"subquestions":"1","answerscales":"1","hasdefaultvalues":"0","assessable":"1","class":"array-flexible-row"}
5	arrays/column	Y	application/views/survey/questions/answer/arrays/column	/assets/images/screenshots/H.png	Array by column	2018-09-08 00:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	Array by column question type configuration	2019-09-23 15:05:59	1	question_theme	H	t		Arrays	{"subquestions":"1","answerscales":"1","hasdefaultvalues":"0","assessable":"1","class":"array-flexible-column"}
6	arrays/dualscale	Y	application/views/survey/questions/answer/arrays/dualscale	/assets/images/screenshots/1.png	Array dual scale	2018-09-08 00:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	Array dual scale question type configuration	2019-09-23 15:05:59	1	question_theme	1	t		Arrays	{"subquestions":"1","answerscales":"2","hasdefaultvalues":"0","assessable":"1","class":"array-flexible-dual-scale"}
7	arrays/increasesamedecrease	Y	application/views/survey/questions/answer/arrays/increasesamedecrease	/assets/images/screenshots/E.png	Array (Increase/Same/Decrease)	2018-09-08 00:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	Array (Increase/Same/Decrease) question type configuration	2019-09-23 15:05:59	1	question_theme	E	t		Arrays	{"subquestions":"1","answerscales":"0","hasdefaultvalues":"0","assessable":"1","class":"array-increase-same-decrease"}
8	arrays/multiflexi	Y	application/views/survey/questions/answer/arrays/multiflexi	/assets/images/screenshots/COLON.png	Array (Numbers)	2018-09-08 00:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	Array (Numbers) question type configuration	2019-09-23 15:05:59	1	question_theme	:	t		Arrays	{"subquestions":"2","answerscales":"0","hasdefaultvalues":"0","assessable":"1","class":"array-multi-flexi"}
9	arrays/texts	Y	application/views/survey/questions/answer/arrays/texts	/assets/images/screenshots/;.png	Array (Texts)	2018-09-08 00:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	Array (Texts) question type configuration	2019-09-23 15:05:59	1	question_theme	;	t		Arrays	{"subquestions":"2","answerscales":"0","hasdefaultvalues":"0","assessable":"0","class":"array-multi-flexi-text"}
10	arrays/yesnouncertain	Y	application/views/survey/questions/answer/arrays/yesnouncertain	/assets/images/screenshots/C.png	Array (Yes/No/Uncertain)	2018-09-08 00:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	Array (Yes/No/Uncertain) question type configuration	2019-09-23 15:05:59	1	question_theme	C	t		Arrays	{"subquestions":"1","answerscales":"0","hasdefaultvalues":"0","assessable":"1","class":"array-yes-uncertain-no"}
11	boilerplate	Y	application/views/survey/questions/answer/boilerplate	/assets/images/screenshots/X.png	Text display	2018-09-08 00:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	Text display question type configuration	2019-09-23 15:05:59	1	question_theme	X	t		Mask questions	{"subquestions":"0","answerscales":"0","hasdefaultvalues":"0","assessable":"0","class":"boilerplate"}
12	date	Y	application/views/survey/questions/answer/date	/assets/images/screenshots/D.png	Date/Time	2018-09-08 00:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	Date/Time question type configuration	2019-09-23 15:05:59	1	question_theme	D	t		Mask questions	{"subquestions":"0","answerscales":"0","hasdefaultvalues":"1","assessable":"0","class":"date"}
13	equation	Y	application/views/survey/questions/answer/equation	/assets/images/screenshots/EQUATION.png	Equation	2018-09-08 00:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	Equation question type configuration	2019-09-23 15:05:59	1	question_theme	*	t		Mask questions	{"subquestions":"0","answerscales":"0","hasdefaultvalues":"0","assessable":"0","class":"equation"}
14	file_upload	Y	application/views/survey/questions/answer/file_upload	/assets/images/screenshots/PIPE.png	File upload	2018-09-08 00:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	File upload question type configuration	2019-09-23 15:05:59	1	question_theme	|	t		Mask questions	{"subquestions":"0","answerscales":"0","hasdefaultvalues":"0","assessable":"0","class":"upload-files"}
15	gender	Y	application/views/survey/questions/answer/gender	/assets/images/screenshots/G.png	Gender	2018-09-08 00:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	Gender question type configuration	2019-09-23 15:05:59	1	question_theme	G	t		Mask questions	{"subquestions":"0","answerscales":"0","hasdefaultvalues":"0","assessable":"0","class":"gender"}
16	hugefreetext	Y	application/views/survey/questions/answer/hugefreetext	/assets/images/screenshots/U.png	Huge free text	1970-01-01 01:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	Huge free text question type configuration	2019-09-23 15:05:59	1	question_theme	U	t		Text questions	{"subquestions":"0","answerscales":"0","hasdefaultvalues":"1","assessable":"0","class":"text-huge"}
17	language	Y	application/views/survey/questions/answer/language	/assets/images/screenshots/I.png	Language switch	2018-09-08 00:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	Language switch question type configuration	2019-09-23 15:05:59	1	question_theme	I	t		Mask questions	{"subquestions":"0","answerscales":"0","hasdefaultvalues":"0","assessable":"0","class":"language"}
18	listradio	Y	application/views/survey/questions/answer/listradio	/assets/images/screenshots/L.png	List (Radio)	2018-09-08 00:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	List (radio) question type configuration	2019-09-23 15:05:59	1	question_theme	L	t		Single choice questions	{"subquestions":"0","answerscales":"1","hasdefaultvalues":"1","assessable":"1","class":"list-radio"}
19	list_dropdown	Y	application/views/survey/questions/answer/list_dropdown	/assets/images/screenshots/!.png	List (Dropdown)	2018-09-08 00:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	List (dropdown) question type configuration	2019-09-23 15:05:59	1	question_theme	!	t		Single choice questions	{"subquestions":"0","answerscales":"1","hasdefaultvalues":"1","assessable":"1","class":"list-dropdown"}
20	list_with_comment	Y	application/views/survey/questions/answer/list_with_comment	/assets/images/screenshots/O.png	List with comment	2018-09-08 00:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	List with comment question type configuration	2019-09-23 15:05:59	1	question_theme	O	t		Single choice questions	{"subquestions":"0","answerscales":"1","hasdefaultvalues":"1","assessable":"1","class":"list-with-comment"}
21	longfreetext	Y	application/views/survey/questions/answer/longfreetext	/assets/images/screenshots/T.png	Long free text	2018-09-08 00:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	Long free text question type configuration	2019-09-23 15:05:59	1	question_theme	T	t		Text questions	{"subquestions":"0","answerscales":"0","hasdefaultvalues":"1","assessable":"0","class":"text-long"}
22	multiplechoice	Y	application/views/survey/questions/answer/multiplechoice	/assets/images/screenshots/M.png	Multiple choice	2018-09-08 00:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	Multiple choice question type configuration	2019-09-23 15:05:59	1	question_theme	M	t		Multiple choice questions	{"subquestions":"1","answerscales":"0","hasdefaultvalues":"1","assessable":"1","class":"multiple-opt"}
23	multiplechoice_with_comments	Y	application/views/survey/questions/answer/multiplechoice_with_comments	/assets/images/screenshots/P.png	Multiple choice with comments	2018-09-08 00:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	Multiple choice with comments question type configuration	2019-09-23 15:05:59	1	question_theme	P	t		Multiple choice questions	{"subquestions":"1","answerscales":"0","hasdefaultvalues":"1","assessable":"1","class":"multiple-opt-comments"}
24	multiplenumeric	Y	application/views/survey/questions/answer/multiplenumeric	/assets/images/screenshots/K.png	Multiple numerical input	2018-09-08 00:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	Multiple numerical input question type configuration	2019-09-23 15:05:59	1	question_theme	K	t		Mask questions	{"subquestions":"1","answerscales":"0","hasdefaultvalues":"1","assessable":"1","class":"numeric-multi"}
25	multipleshorttext	Y	application/views/survey/questions/answer/multipleshorttext	/assets/images/screenshots/Q.png	Multiple short text	2018-09-08 00:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	Multiple short text question type configuration	2019-09-23 15:05:59	1	question_theme	Q	t		Text questions	{"subquestions":"1","answerscales":"0","hasdefaultvalues":"1","assessable":"0","class":"multiple-short-txt"}
26	numerical	Y	application/views/survey/questions/answer/numerical	/assets/images/screenshots/N.png	Numerical input	2018-09-08 00:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	Numerical input question type configuration	2019-09-23 15:05:59	1	question_theme	N	t		Mask questions	{"subquestions":"0","answerscales":"0","hasdefaultvalues":"1","assessable":"0","class":"numeric"}
27	ranking	Y	application/views/survey/questions/answer/ranking	/assets/images/screenshots/R.png	Ranking	2018-09-08 00:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	Ranking question type configuration	2019-09-23 15:05:59	1	question_theme	R	t		Mask questions	{"subquestions":"0","answerscales":"1","hasdefaultvalues":"0","assessable":"1","class":"ranking"}
28	shortfreetext	Y	application/views/survey/questions/answer/shortfreetext	/assets/images/screenshots/S.png	Short free text	2018-09-08 00:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	Short free text question type configuration	2019-09-23 15:05:59	1	question_theme	S	t		Text questions	{"subquestions":"0","answerscales":"0","hasdefaultvalues":"1","assessable":"0","class":"text-short"}
29	yesno	Y	application/views/survey/questions/answer/yesno	/assets/images/screenshots/Y.png	Yes/No	2018-09-08 00:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	Yes/No question type configuration	2019-09-23 15:05:59	1	question_theme	Y	t		Mask questions	{"subquestions":"0","answerscales":"0","hasdefaultvalues":"1","assessable":"0","class":"yes-no"}
30	bootstrap_dropdown	Y	themes/question/bootstrap_dropdown/survey/questions/answer/list_dropdown	/themes/question/bootstrap_dropdown/survey/questions/answer/list_dropdown/assets/bootstrap_dropdown_list_dropdown.png	Bootstrap dropdown	1970-01-01 01:00:00	Adam Zammit	adam.zammit@acspri.org.au	https://www.acspri.org.au	Copyright (C) 2021 The Australian Consortium for Social and Political Research Incorporated (ACSPRI)	GNU General Public License version 2 or later	1.0	1	Bootstrap dropdown theme	2021-09-29 12:00:00	1	question_theme	!	t	!	Single choice questions	{"subquestions":"0","answerscales":"1","hasdefaultvalues":"1","assessable":"1","class":"list-dropdown"}
31	bootstrap_buttons	Y	themes/question/bootstrap_buttons/survey/questions/answer/listradio	/themes/question/bootstrap_buttons/survey/questions/answer/listradio/assets/bootstrap_buttons_listradio.png	Bootstrap buttons	1970-01-01 01:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	New implementation of the Bootstrap buttons question theme	2019-09-23 15:05:59	1	question_theme	L	t	L	Single choice questions	{"subquestions":"0","answerscales":"1","hasdefaultvalues":"1","assessable":"1","class":"list-radio"}
32	bootstrap_buttons_multi	Y	themes/question/bootstrap_buttons_multi/survey/questions/answer/multiplechoice	/themes/question/bootstrap_buttons_multi/survey/questions/answer/multiplechoice/assets/bootstrap_buttons_multiplechoice.png	Bootstrap buttons	1970-01-01 01:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2018 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	New implementation of the Bootstrap buttons question theme	2019-09-23 15:05:59	1	question_theme	M	t	M	Multiple choice questions	{"subquestions":"1","answerscales":"0","hasdefaultvalues":"1","assessable":"1","class":"multiple-opt"}
33	browserdetect	Y	themes/question/browserdetect/survey/questions/answer/shortfreetext	/assets/images/screenshots/S.png	Browser detection	2017-07-09 00:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2017 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	Browser, Platform and Proxy detection	2019-09-23 15:05:59	1	question_theme	S	t	S	Text questions	{"subquestions":"0","answerscales":"0","hasdefaultvalues":"1","assessable":"0","class":"text-short"}
34	image_select-listradio	Y	themes/question/image_select-listradio/survey/questions/answer/listradio	/assets/images/screenshots/L.png	Image select list (Radio)	1970-01-01 01:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2016 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	List Radio with images.	2019-09-23 15:05:59	1	question_theme	L	t	L	Single choice questions	{"subquestions":"0","answerscales":"1","hasdefaultvalues":"1","assessable":"1","class":"list-radio"}
35	image_select-multiplechoice	Y	themes/question/image_select-multiplechoice/survey/questions/answer/multiplechoice	/assets/images/screenshots/M.png	Image select multiple choice	1970-01-01 01:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2016 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	Multiplechoice with images.	2019-09-23 15:05:59	1	question_theme	M	t	M	Multiple choice questions	{"subquestions":"1","answerscales":"0","hasdefaultvalues":"1","assessable":"1","class":"multiple-opt"}
36	inputondemand	Y	themes/question/inputondemand/survey/questions/answer/multipleshorttext	/assets/images/screenshots/Q.png	Input on demand	2019-10-04 00:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2019 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	Hide not needed input fields in multiple shorttext	2019-09-23 15:05:59	1	question_theme	Q	t	Q	Text questions	{"subquestions":"1","answerscales":"0","hasdefaultvalues":"1","assessable":"0","class":"multiple-short-txt"}
37	ranking_advanced	Y	themes/question/ranking_advanced/survey/questions/answer/ranking	/assets/images/screenshots/R.png	Ranking advanced	1970-01-01 01:00:00	LimeSurvey GmbH	info@limesurvey.org	http://www.limesurvey.org	Copyright (C) 2005 - 2017 LimeSurvey Gmbh, Inc. All rights reserved.	GNU General Public License version 2 or later	1.0	1	New implementation of the ranking question	2019-09-23 15:05:59	1	question_theme	R	t	R	Mask questions	{"subquestions":"0","answerscales":"1","hasdefaultvalues":"0","assessable":"1","class":"ranking"}
\.


--
-- Data for Name: lime_questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_questions (qid, parent_qid, sid, gid, type, title, preg, other, mandatory, encrypted, question_order, scale_id, same_default, relevance, question_theme_name, modulename, same_script) FROM stdin;
5	0	641746	3	T	G01Q01		N	N	N	1	0	0	1	longfreetext		0
6	0	641746	4	T	G02Q02		N	N	N	1	0	0	1	longfreetext		0
7	0	641746	5	T	G03Q03		N	N	N	1	0	0	1	longfreetext		0
\.


--
-- Data for Name: lime_quota; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_quota (id, sid, name, qlimit, action, active, autoload_url) FROM stdin;
\.


--
-- Data for Name: lime_quota_languagesettings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_quota_languagesettings (quotals_id, quotals_quota_id, quotals_language, quotals_name, quotals_message, quotals_url, quotals_urldescrip) FROM stdin;
\.


--
-- Data for Name: lime_quota_members; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_quota_members (id, sid, qid, quota_id, code) FROM stdin;
\.


--
-- Data for Name: lime_saved_control; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_saved_control (scid, sid, srid, identifier, access_code, email, ip, saved_thisstep, status, saved_date, refurl) FROM stdin;
\.


--
-- Data for Name: lime_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_sessions (id, expire, data) FROM stdin;
\.


--
-- Data for Name: lime_settings_global; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_settings_global (stg_name, stg_value) FROM stdin;
sendadmincreationemail	1
admincreationemailsubject	User registration at '{SITENAME}'
admincreationemailtemplate	<p>Hello {FULLNAME}, </p><p>This is an automated email notification that a user has been created for you on the website <strong>'{SITENAME}'</strong>.</p><p></p><p>You can use now the following credentials to log in:</p><p><strong>Username</strong>: {USERNAME}</p><p><a href="{LOGINURL}">Click here to set your password</a></p><p>If you have any questions regarding this email, please do not hesitate to contact the site administrator at {SITEADMINEMAIL}.</p><p> </p><p>Thank you!</p>
DBVersion	623
SessionName	MJVQIEVUFERNAGHLGSWFQTBVXFZVIJJIVTJDATVYVUNMDUXSTRYYBDJGIMFDBHUS
sitename	LimeSurvey
siteadminname	Administrator
siteadminemail	emmamendez07@gmail.com
siteadminbounce	emmamendez07@gmail.com
defaultlang	en
AssetsVersion	30412
last_survey_1	641746
\.


--
-- Data for Name: lime_settings_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_settings_user (id, uid, entity, entity_id, stg_name, stg_value) FROM stdin;
1	1	\N	\N	quickaction_state	1
2	1	\N	\N	lock_organizer	1
\.


--
-- Data for Name: lime_source_message; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_source_message (id, category, message) FROM stdin;
\.


--
-- Data for Name: lime_survey_641746; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_survey_641746 (id, token, submitdate, lastpage, startlanguage, seed, startdate, datestamp, ipaddr, refurl, "641746X3X5", "641746X4X6", "641746X5X7") FROM stdin;
1	\N	2024-12-17 14:33:14	3	en	1292637762	2024-12-17 14:32:00	2024-12-17 14:33:14	84.66.90.227	https://afb9-84-66-90-227.ngrok-free.app/limesurvey/	Wedgies!!! HATE Them and when my bra digs into my skin	feeling secure in my underwear and sexy	like ew i have a secret pain
2	\N	\N	\N	en	394125593	2024-12-17 22:39:17	2024-12-17 22:39:17	::1	\N	\N	\N	\N
3	\N	\N	\N	en	2034548187	2024-12-22 09:06:23	2024-12-22 09:06:23	::1	http://localhost:8080/limesurvey/	\N	\N	\N
4	ilHu0daF0yd0PKe	\N	\N	en	128314637	2024-12-25 20:08:40	2024-12-25 20:08:40	::1	http://localhost:8080/limesurvey/index.php/admin/tokens/sa/index/surveyid/641746	\N	\N	\N
\.


--
-- Data for Name: lime_survey_641746_timings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_survey_641746_timings (id, interviewtime, "641746X3time", "641746X3X5time", "641746X4time", "641746X4X6time", "641746X5time", "641746X5X7time") FROM stdin;
1	75.81	31.66	\N	22.8	\N	21.35	\N
2	0	\N	\N	\N	\N	\N	\N
3	0	\N	\N	\N	\N	\N	\N
4	0	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: lime_survey_links; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_survey_links (participant_id, token_id, survey_id, date_created, date_invited, date_completed) FROM stdin;
\.


--
-- Data for Name: lime_survey_url_parameters; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_survey_url_parameters (id, sid, parameter, targetqid, targetsqid) FROM stdin;
\.


--
-- Data for Name: lime_surveymenu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_surveymenu (id, parent_id, survey_id, user_id, name, ordering, level, title, "position", description, showincollapse, active, changed_at, changed_by, created_at, created_by) FROM stdin;
1	\N	\N	\N	settings	1	0	Survey settings	side	Survey settings	1	1	2024-12-17 13:26:42	0	2024-12-17 13:26:42	0
2	\N	\N	\N	mainmenu	2	0	Survey menu	side	Main survey menu	1	1	2024-12-17 13:26:42	0	2024-12-17 13:26:42	0
3	\N	\N	\N	quickmenu	3	0	Quick menu	collapsed	Quick menu	0	1	2024-12-17 13:26:42	0	2024-12-17 13:26:42	0
\.


--
-- Data for Name: lime_surveymenu_entries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_surveymenu_entries (id, menu_id, user_id, ordering, name, title, menu_title, menu_description, menu_icon, menu_icon_type, menu_class, menu_link, action, template, partial, classes, permission, permission_grade, data, getdatamethod, language, showincollapse, active, changed_at, changed_by, created_at, created_by) FROM stdin;
1	1	\N	1	overview	Survey overview	Overview	Open the general survey overview	ri-bar-chart-horizontal-line	remix		surveyAdministration/view							{"render": { "link": {"data": {"surveyid": ["survey","sid"]}}}}		en-GB	0	1	2024-12-17 13:26:42	0	2024-12-17 13:26:42	0
2	1	\N	2	generalsettings	General survey settings	General settings	Open general survey settings	ri-tools-line	remix			updatesurveylocalesettings_generalsettings	editLocalSettings_main_view	/admin/survey/subview/accordion/_generaloptions_panel		surveysettings	read	\N	generalTabEditSurvey	en-GB	1	1	2024-12-17 13:26:42	0	2024-12-17 13:26:42	0
3	1	\N	3	surveytexts	Survey text elements	Text elements	Survey text elements	ri-text-spacing	remix			updatesurveylocalesettings	editLocalSettings_main_view	/admin/survey/subview/tab_edit_view		surveylocale	read	\N	getTextEditData	en-GB	1	1	2024-12-17 13:26:42	0	2024-12-17 13:26:42	0
4	1	\N	4	datasecurity	Privacy policy settings	Privacy policy	Edit privacy policy settings	ri-shield-line	remix			updatesurveylocalesettings	editLocalSettings_main_view	/admin/survey/subview/tab_edit_view_datasecurity		surveylocale	read	\N	getDataSecurityEditData	en-GB	1	1	2024-12-17 13:26:42	0	2024-12-17 13:26:42	0
5	1	\N	5	theme_options	Theme options	Theme options	Edit theme options for this survey	ri-contrast-drop-fill	remix		themeOptions/updateSurvey					surveysettings	update	{"render": {"link": { "pjaxed": true, "data": {"surveyid": ["survey","sid"], "gsid":["survey","gsid"]}}}}		en-GB	0	1	2024-12-17 13:26:42	0	2024-12-17 13:26:42	0
6	1	\N	6	presentation	Presentation & navigation settings	Presentation	Edit presentation and navigation settings	ri-slideshow-line	remix			updatesurveylocalesettings	editLocalSettings_main_view	/admin/survey/subview/accordion/_presentation_panel		surveylocale	read	\N	tabPresentationNavigation	en-GB	0	1	2024-12-17 13:26:42	0	2024-12-17 13:26:42	0
7	1	\N	7	tokens	Survey participant settings	Participant settings	Set additional options for survey participants	ri-body-scan-fill	remix			updatesurveylocalesettings	editLocalSettings_main_view	/admin/survey/subview/accordion/_tokens_panel		surveylocale	read	\N	tabTokens	en-GB	0	1	2024-12-17 13:26:42	0	2024-12-17 13:26:42	0
8	1	\N	8	notification	Notification and data management settings	Notifications & data	Edit settings for notification and data management	ri-notification-line	remix			updatesurveylocalesettings	editLocalSettings_main_view	/admin/survey/subview/accordion/_notification_panel		surveylocale	read	\N	tabNotificationDataManagement	en-GB	0	1	2024-12-17 13:26:42	0	2024-12-17 13:26:42	0
9	1	\N	9	publication	Publication & access control settings	Publication & access	Edit settings for publication and access control	ri-key-line	remix			updatesurveylocalesettings	editLocalSettings_main_view	/admin/survey/subview/accordion/_publication_panel		surveylocale	read	\N	tabPublicationAccess	en-GB	0	1	2024-12-17 13:26:42	0	2024-12-17 13:26:42	0
10	1	\N	10	surveypermissions	Edit survey permissions	Survey permissions	Edit permissions for this survey	ri-lock-password-line	remix		surveyPermissions/index					surveysecurity	read	{"render": { "link": {"data": {"surveyid": ["survey","sid"]}}}}		en-GB	0	1	2024-12-17 13:26:42	0	2024-12-17 13:26:42	0
11	2	\N	1	listQuestions	Overview questions & groups	Overview questions & groups	Overview of questions and groups where you can add, edit and reorder them		remix		questionAdministration/listQuestions					surveycontent	read	{"render": { "link": {"data": {"surveyid": ["survey","sid"]}}}}		en-GB	1	1	2024-12-17 13:26:42	0	2024-12-17 13:26:42	0
12	2	\N	4	participants	Survey participants	Survey participants	Go to survey participant and token settings		remix		admin/tokens/sa/index/					tokens	read	{"render": { "link": {"data": {"surveyid": ["survey","sid"]}}}}		en-GB	1	1	2024-12-17 13:26:42	0	2024-12-17 13:26:42	0
13	2	\N	5	emailtemplates	Email templates	Email templates	Edit the templates for invitation, reminder and registration emails		remix		admin/emailtemplates/sa/index/					surveylocale	read	{"render": { "link": {"data": {"surveyid": ["survey","sid"]}}}}		en-GB	0	1	2024-12-17 13:26:42	0	2024-12-17 13:26:42	0
14	2	\N	6	failedemail	Failed email notifications	Failed email notifications	View and resend failed email notifications		remix		failedEmail/index/					surveylocale	read	{"render": { "link": {"data": {"surveyid": ["survey","sid"]}}}}		en-GB	0	1	2024-12-17 13:26:42	0	2024-12-17 13:26:42	0
15	2	\N	7	quotas	Edit quotas	Quotas	Edit quotas for this survey.		remix		quotas/index/					quotas	read	{"render": { "link": {"data": {"surveyid": ["survey","sid"]}}}}		en-GB	0	1	2024-12-17 13:26:42	0	2024-12-17 13:26:42	0
16	2	\N	8	assessments	Edit assessments	Assessments	Edit and look at the assessements for this survey.		remix		assessment/index					assessments	read	{"render": { "link": {"data": {"surveyid": ["survey","sid"]}}}}		en-GB	0	1	2024-12-17 13:26:42	0	2024-12-17 13:26:42	0
17	2	\N	9	panelintegration	Edit survey panel integration	Panel integration	Define panel integrations for your survey		remix			updatesurveylocalesettings	editLocalSettings_main_view	/admin/survey/subview/accordion/_integration_panel		surveylocale	read	{"render": {"link": { "pjaxed": false}}}	tabPanelIntegration	en-GB	0	1	2024-12-17 13:26:42	0	2024-12-17 13:26:42	0
18	2	\N	10	responses	Responses	Responses	Responses		remix		responses/browse/					responses	read	{"render": {"isActive": true, "link": {"data": {"surveyId": ["survey", "sid"]}}}}		en-GB	1	1	2024-12-17 13:26:42	0	2024-12-17 13:26:42	0
19	2	\N	11	statistics	Statistics	Statistics	Statistics		remix		admin/statistics/sa/index/					statistics	read	{"render": {"isActive": true, "link": {"data": {"surveyid": ["survey", "sid"]}}}}		en-GB	1	1	2024-12-17 13:26:42	0	2024-12-17 13:26:42	0
20	2	\N	12	resources	Add/edit resources (files/images) for this survey	Resources	Add/edit resources (files/images) for this survey		remix			updatesurveylocalesettings	editLocalSettings_main_view	/admin/survey/subview/accordion/_resources_panel		surveylocale	read	{"render": { "link": {"data": {"surveyid": ["survey","sid"]}}}}	tabResourceManagement	en-GB	0	1	2024-12-17 13:26:42	0	2024-12-17 13:26:42	0
21	2	\N	13	plugins	Simple plugin settings	Simple plugins	Edit simple plugin settings		remix			updatesurveylocalesettings	editLocalSettings_main_view	/admin/survey/subview/accordion/_plugins_panel		surveysettings	read	{"render": {"link": {"data": {"surveyid": ["survey","sid"]}}}}	pluginTabSurvey	en-GB	0	1	2024-12-17 13:26:42	0	2024-12-17 13:26:42	0
22	3	\N	1	activateSurvey	Activate survey	Activate survey	Activate survey	ri-play-fill	remix		surveyAdministration/activate					surveyactivation	update	{"render": {"isActive": false, "link": {"data": {"iSurveyID": ["survey","sid"]}}}}		en-GB	1	1	2024-12-17 13:26:42	0	2024-12-17 13:26:42	0
23	3	\N	2	deactivateSurvey	Stop survey	Stop survey	Stop this survey	ri-stop-fill	remix		surveyAdministration/deactivate					surveyactivation	update	{"render": {"isActive": true, "link": {"data": {"surveyid": ["survey","sid"]}}}}		en-GB	1	1	2024-12-17 13:26:42	0	2024-12-17 13:26:42	0
24	3	\N	3	testSurvey	Go to survey	Go to survey	Go to survey	ri-settings-5-fill	remix		survey/index/							{"render": {"link": {"external": true, "data": {"sid": ["survey","sid"], "newtest": "Y", "lang": ["survey","language"]}}}}		en-GB	1	1	2024-12-17 13:26:42	0	2024-12-17 13:26:42	0
25	3	\N	4	surveyLogicFile	Survey logic file	Survey logic file	Survey logic file	ri-git-branch-fill	remix		admin/expressions/sa/survey_logic_file/					surveycontent	read	{"render": { "link": {"data": {"sid": ["survey","sid"]}}}}		en-GB	1	1	2024-12-17 13:26:42	0	2024-12-17 13:26:42	0
26	3	\N	5	cpdb	Central participant database	Central participant database	Central participant database	ri-group-fill	remix		admin/participants/sa/displayParticipants					tokens	read	{"render": {"link": {}}}		en-GB	1	1	2024-12-17 13:26:42	0	2024-12-17 13:26:42	0
\.


--
-- Data for Name: lime_surveys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_surveys (sid, owner_id, gsid, admin, active, expires, startdate, adminemail, anonymized, format, savetimings, template, language, additional_languages, datestamp, usecookie, allowregister, allowsave, autonumber_start, autoredirect, allowprev, printanswers, ipaddr, ipanonymize, refurl, datecreated, showsurveypolicynotice, publicstatistics, publicgraphs, listpublic, htmlemail, sendconfirmation, tokenanswerspersistence, assessments, usecaptcha, usetokens, bounce_email, attributedescriptions, emailresponseto, emailnotificationto, tokenlength, showxquestions, showgroupinfo, shownoanswer, showqnumcode, bouncetime, bounceprocessing, bounceaccounttype, bounceaccounthost, bounceaccountpass, bounceaccountencryption, bounceaccountuser, showwelcome, showprogress, questionindex, navigationdelay, nokeyboard, alloweditaftercompletion, googleanalyticsstyle, googleanalyticsapikey, tokenencryptionoptions) FROM stdin;
641746	1	1	inherit	Y	\N	\N	inherit	N	I	Y	inherit	en		Y	I	I	I	0	I	Y	Y	Y	N	Y	2024-12-17 13:28:25	1	Y	Y	Y	I	N	Y	I	J	N	inherit	\N	emmamendez07@gmail.com	emmamendez07@gmail.com	15	I	I	N	N	\N	N	\N	\N	\N	\N	\N	I	I	-1	-1	I	I	0		{ "enabled":"Y","columns":{ "firstname":"N","lastname":"N","email":"N" } }
\.


--
-- Data for Name: lime_surveys_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_surveys_groups (gsid, name, title, template, description, sortorder, owner_id, parent_id, alwaysavailable, created, modified, created_by) FROM stdin;
1	default	Default	\N	Default survey group	0	1	\N	\N	2024-12-17 13:26:42	2024-12-17 13:26:42	1
\.


--
-- Data for Name: lime_surveys_groupsettings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_surveys_groupsettings (gsid, owner_id, admin, adminemail, anonymized, format, savetimings, template, datestamp, usecookie, allowregister, allowsave, autonumber_start, autoredirect, allowprev, printanswers, ipaddr, ipanonymize, refurl, showsurveypolicynotice, publicstatistics, publicgraphs, listpublic, htmlemail, sendconfirmation, tokenanswerspersistence, assessments, usecaptcha, bounce_email, attributedescriptions, emailresponseto, emailnotificationto, tokenlength, showxquestions, showgroupinfo, shownoanswer, showqnumcode, showwelcome, showprogress, questionindex, navigationdelay, nokeyboard, alloweditaftercompletion) FROM stdin;
1	-1	inherit	inherit	I	I	I	inherit	I	I	I	I	0	I	I	I	I	I	I	0	I	I	I	I	I	I	I	E	inherit	\N	inherit	inherit	-1	I	I	I	I	I	I	-1	-1	I	I
0	1	Administrator	emmamendez07@gmail.com	N	G	N	fruity_twentythree	N	N	N	Y	0	N	N	N	N	N	N	0	N	N	N	Y	Y	N	N	N	\N	\N	\N	\N	15	Y	B	Y	X	Y	Y	0	0	N	N
\.


--
-- Data for Name: lime_surveys_languagesettings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_surveys_languagesettings (surveyls_survey_id, surveyls_language, surveyls_title, surveyls_description, surveyls_welcometext, surveyls_endtext, surveyls_policy_notice, surveyls_policy_error, surveyls_policy_notice_label, surveyls_url, surveyls_urldescription, surveyls_email_invite_subj, surveyls_email_invite, surveyls_email_remind_subj, surveyls_email_remind, surveyls_email_register_subj, surveyls_email_register, surveyls_email_confirm_subj, surveyls_email_confirm, surveyls_dateformat, surveyls_attributecaptions, surveyls_alias, email_admin_notification_subj, email_admin_notification, email_admin_responses_subj, email_admin_responses, surveyls_numberformat, attachments) FROM stdin;
641746	en	KLPS Survey				We value your privacy and will only use your data as outlined in our Privacy Policy. Your data will be securely stored and used for market research, developing consumer insights, and creating anonymised analytical reports to improve products and services. For more details, click the link above to read our full Privacy Policy.	You must agree to the Privacy Policy before submitting the survey.	I have read and agree to the {STARTPOLICYLINK}Privacy Policy{ENDPOLICYLINK}.			Invitation to participate in a survey	Dear {FIRSTNAME},<br />\n<br />\nYou have been invited to participate in a survey.<br />\n<br />\nThe survey is titled:<br />\n"{SURVEYNAME}"<br />\n<br />\n"{SURVEYDESCRIPTION}"<br />\n<br />\nTo participate, please click on the link below.<br />\n<br />\nSincerely,<br />\n<br />\n{ADMINNAME} ({ADMINEMAIL})<br />\n<br />\n----------------------------------------------<br />\nClick here to do the survey:<br />\n{SURVEYURL}<br />\n<br />\nIf you do not want to participate in this survey and don't want to receive any more invitations please click the following link:<br />\n{OPTOUTURL}<br />\n<br />\nIf you are blocklisted but want to participate in this survey and want to receive invitations please click the following link:<br />\n{OPTINURL}	Reminder to participate in a survey	Dear {FIRSTNAME},<br />\n<br />\nRecently we invited you to participate in a survey.<br />\n<br />\nWe note that you have not yet completed the survey, and wish to remind you that the survey is still available should you wish to take part.<br />\n<br />\nThe survey is titled:<br />\n"{SURVEYNAME}"<br />\n<br />\n"{SURVEYDESCRIPTION}"<br />\n<br />\nTo participate, please click on the link below.<br />\n<br />\nSincerely,<br />\n<br />\n{ADMINNAME} ({ADMINEMAIL})<br />\n<br />\n----------------------------------------------<br />\nClick here to do the survey:<br />\n{SURVEYURL}<br />\n<br />\nIf you do not want to participate in this survey and don't want to receive any more invitations please click the following link:<br />\n{OPTOUTURL}	Survey registration confirmation	Dear {FIRSTNAME},<br />\n<br />\nYou, or someone using your email address, have registered to participate in an online survey titled {SURVEYNAME}.<br />\n<br />\nTo complete this survey, click on the following URL:<br />\n<br />\n{SURVEYURL}<br />\n<br />\nIf you have any questions about this survey, or if you did not register to participate and believe this email is in error, please contact {ADMINNAME} at {ADMINEMAIL}.	Confirmation of your participation in our survey	Dear {FIRSTNAME},<br />\n<br />\nThis email is to confirm that you have completed the survey titled {SURVEYNAME} and your response has been saved. Thank you for participating.<br />\n<br />\nIf you have any further questions about this email, please contact {ADMINNAME} on {ADMINEMAIL}.<br />\n<br />\nSincerely,<br />\n<br />\n{ADMINNAME}	9	\N		Response submission for survey {SURVEYNAME}	Hello,<br />\n<br />\nA new response was submitted for your survey '{SURVEYNAME}'.<br />\n<br />\nClick the following link to see the individual response:<br />\n{VIEWRESPONSEURL}<br />\n<br />\nClick the following link to edit the individual response:<br />\n{EDITRESPONSEURL}<br />\n<br />\nView statistics by clicking here:<br />\n{STATISTICSURL}	Response submission for survey {SURVEYNAME} with results	Hello,<br />\n<br />\nA new response was submitted for your survey '{SURVEYNAME}'.<br />\n<br />\nClick the following link to see the individual response:<br />\n{VIEWRESPONSEURL}<br />\n<br />\nClick the following link to edit the individual response:<br />\n{EDITRESPONSEURL}<br />\n<br />\nView statistics by clicking here:<br />\n{STATISTICSURL}<br />\n<br />\n<br />\nThe following answers were given by the participant:<br />\n{ANSWERTABLE}	0	\N
\.


--
-- Data for Name: lime_template_configuration; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_template_configuration (id, template_name, sid, gsid, uid, files_css, files_js, files_print_css, options, cssframework_name, cssframework_css, cssframework_js, packages_to_load, packages_ltr, packages_rtl) FROM stdin;
1	vanilla	\N	\N	\N	{"add":["css/base.css","css/theme.css","css/noTablesOnMobile.css","css/custom.css"]}	{"add":["scripts/theme.js","scripts/ajaxify.js","scripts/custom.js"]}	{"add":["css/print_theme.css"]}	{"ajaxmode":"off", "animatebody":"off", "fixnumauto":"enable","brandlogo":"on","container":"on", "hideprivacyinfo": "off", "brandlogofile":"themes/survey/vanilla/files/logo.png","font":"noto", "showpopups":"1", "showclearall":"off", "questionhelptextposition":"top"}	bootstrap	{}		{"add":["pjax","font-noto","moment"]}	\N	\N
2	fruity	\N	\N	\N	{"add":["css/ajaxify.css","css/animate.css","css/variations/sea_green.css","css/theme.css","css/custom.css"]}	{"add":["scripts/theme.js","scripts/ajaxify.js","scripts/custom.js"]}	{"add":["css/print_theme.css"]}	{"ajaxmode":"off","fixnumauto":"enable","brandlogo":"on","brandlogofile":"themes/survey/fruity/files/logo.png","container":"on","backgroundimage":"off","backgroundimagefile":null,"animatebody":"off","bodyanimation":"fadeInRight","bodyanimationduration":"500","animatequestion":"off","questionanimation":"flipInX","questionanimationduration":"500","animatealert":"off","alertanimation":"shake","alertanimationduration":"500","font":"noto","bodybackgroundcolor":"#ffffff","fontcolor":"#444444","questionbackgroundcolor":"#ffffff","questionborder":"on","questioncontainershadow":"on","checkicon":"f00c","animatecheckbox":"on","checkboxanimation":"rubberBand","checkboxanimationduration":"500","animateradio":"on","radioanimation":"zoomIn","radioanimationduration":"500","zebrastriping":"off","stickymatrixheaders":"off","greyoutselected":"off","hideprivacyinfo":"off","crosshover":"off","showpopups":"1", "showclearall":"off", "questionhelptextposition":"top","notables":"1"}	bootstrap	{}		{"add":["pjax","font-noto","moment"]}	\N	\N
3	bootswatch	\N	\N	\N	{"add":["css/ajaxify.css","css/theme.css","css/custom.css"]}	{"add":["scripts/theme.js","scripts/ajaxify.js","scripts/custom.js"]}	{"add":["css/print_theme.css"]}	{"ajaxmode":"off","fixnumauto":"enable","brandlogo":"on","container":"on","brandlogofile":"themes/survey/bootswatch/files/logo.png", "showpopups":"1", "showclearall":"off", "hideprivacyinfo": "off", "questionhelptextposition":"top"}	bootstrap	{"replace":[["css/bootstrap.css","css/variations/flatly.min.css"]]}		{"add":["pjax","font-noto","moment"]}	\N	\N
4	fruity_twentythree	\N	\N	\N	{"add":["css/variations/theme_apple.css","css/base.css","css/custom.css"], "remove":["survey.css", "template-core.css", "awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css", "awesome-bootstrap-checkbox/awesome-bootstrap-checkbox-rtl.css"]}	{"add":["scripts/theme.js","scripts/custom.js"], "remove":["survey.js", "template-core.js"]}	{"add":["css/print_theme.css"]}	{"hideprivacyinfo":"off","showpopups":"1","showclearall":"off","questionhelptextposition":"top","fixnumauto":"enable","backgroundimage":"off","backgroundimagefile":".\\/files\\/pattern.png",\n                                     "brandlogo":"off","brandlogofile":"image::theme::files\\/logo.png","font":"ibm-sans",\n                                     "cssframework":"Apple"}				{"add":["pjax","moment","font-ibm-sans","font-ibm-serif"]}	\N	\N
6	fruity_twentythree	\N	1	\N	inherit	inherit	inherit	inherit	inherit	inherit	inherit	inherit	\N	\N
7	fruity_twentythree	834145	\N	\N	inherit	inherit	inherit	inherit	inherit	inherit	inherit	inherit	\N	\N
8	fruity_twentythree	834145	\N	\N	inherit	inherit	inherit	inherit	inherit	inherit	inherit	inherit	\N	\N
9	fruity_twentythree	834145	\N	\N	inherit	inherit	inherit	inherit	inherit	inherit	inherit	inherit	\N	\N
10	fruity_twentythree	834145	\N	\N	inherit	inherit	inherit	inherit	inherit	inherit	inherit	inherit	\N	\N
11	fruity_twentythree	834145	\N	\N	inherit	inherit	inherit	inherit	inherit	inherit	inherit	inherit	\N	\N
12	fruity_twentythree	834145	\N	\N	inherit	inherit	inherit	inherit	inherit	inherit	inherit	inherit	\N	\N
13	fruity_twentythree	834145	\N	\N	inherit	inherit	inherit	inherit	inherit	inherit	inherit	inherit	\N	\N
5	fruity_twentythree	641746	\N	\N	inherit	inherit	inherit	inherit	inherit	inherit	inherit	inherit	\N	\N
\.


--
-- Data for Name: lime_templates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_templates (id, name, folder, title, creation_date, author, author_email, author_url, copyright, license, version, api_version, view_folder, files_folder, description, last_update, owner_id, extends) FROM stdin;
1	vanilla	vanilla	Bootstrap Vanilla	2024-12-17 13:26:42	LimeSurvey GmbH	info@limesurvey.org	https://www.limesurvey.org/	Copyright (C) 2007-2019 The LimeSurvey Project Team\\r\\nAll rights reserved.	License: GNU/GPL License v2 or later, see LICENSE.php\\r\\n\\r\\nLimeSurvey is free software. This version may have been modified pursuant to the GNU General Public License, and as distributed it includes or is derivative of works licensed under the GNU General Public License or other free or open source software licenses. See COPYRIGHT.php for copyright notices and details.	3.0	3.0	views	files	A clean and simple base that can be used by developers to create their own Bootstrap based theme.	\N	1	
2	fruity	fruity	Fruity	2024-12-17 13:26:42	LimeSurvey GmbH	info@limesurvey.org	https://www.limesurvey.org/	Copyright (C) 2007-2019 The LimeSurvey Project Team\\r\\nAll rights reserved.	License: GNU/GPL License v2 or later, see LICENSE.php\\r\\n\\r\\nLimeSurvey is free software. This version may have been modified pursuant to the GNU General Public License, and as distributed it includes or is derivative of works licensed under the GNU General Public License or other free or open source software licenses. See COPYRIGHT.php for copyright notices and details.	3.0	3.0	views	files	A fruity theme for a flexible use. This theme offers monochromes variations and many options for easy customizations.	\N	1	vanilla
3	bootswatch	bootswatch	Bootswatch	2024-12-17 13:26:42	LimeSurvey GmbH	info@limesurvey.org	https://www.limesurvey.org/	Copyright (C) 2007-2019 The LimeSurvey Project Team\\r\\nAll rights reserved.	License: GNU/GPL License v2 or later, see LICENSE.php\\r\\n\\r\\nLimeSurvey is free software. This version may have been modified pursuant to the GNU General Public License, and as distributed it includes or is derivative of works licensed under the GNU General Public License or other free or open source software licenses. See COPYRIGHT.php for copyright notices and details.	3.0	3.0	views	files	Based on BootsWatch Themes:<br><a href='https://bootswatch.com/3/'>Visit Bootswatch page</a>	\N	1	vanilla
4	fruity_twentythree	fruity_twentythree	Fruity TwentyThree	2024-12-17 13:26:42	LimeSurvey GmbH	info@limesurvey.org	https://www.limesurvey.org/	Copyright (C) 2005 - 2023 LimeSurvey Gmbh, Inc. All rights reserved.	License: GNU/GPL License v2 or later, see LICENSE.php\\r\\n\\r\\nLimeSurvey is free software. This version may have been modified pursuant to the GNU General Public License, and as distributed it includes or is derivative of works licensed under the GNU General Public License or other free or open source software licenses. See COPYRIGHT.php for copyright notices and details.	1.0.0	3.0	views	files	Our default theme for a fruity and flexible use. This theme offers single color variations	\N	1	
\.


--
-- Data for Name: lime_tokens_641746; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_tokens_641746 (tid, participant_id, firstname, lastname, email, emailstatus, token, language, blacklisted, sent, remindersent, remindercount, completed, usesleft, validfrom, validuntil, mpid) FROM stdin;
1	\N	Emma	Mendez	emmamendez07@gmail.com	OK	ilHu0daF0yd0PKe	en	\N	2024-12-25 19:51	N	0	N	1	\N	\N	\N
\.


--
-- Data for Name: lime_tutorial_entries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_tutorial_entries (teid, ordering, title, content, settings) FROM stdin;
\.


--
-- Data for Name: lime_tutorial_entry_relation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_tutorial_entry_relation (teid, tid, uid, sid) FROM stdin;
\.


--
-- Data for Name: lime_tutorials; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_tutorials (tid, name, title, icon, description, active, settings, permission, permission_grade) FROM stdin;
\.


--
-- Data for Name: lime_user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_user_groups (ugid, name, description, owner_id) FROM stdin;
\.


--
-- Data for Name: lime_user_in_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_user_in_groups (ugid, uid) FROM stdin;
\.


--
-- Data for Name: lime_user_in_permissionrole; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_user_in_permissionrole (ptid, uid) FROM stdin;
\.


--
-- Data for Name: lime_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lime_users (uid, users_name, password, full_name, parent_id, lang, email, htmleditormode, templateeditormode, questionselectormode, one_time_pw, dateformat, last_login, created, modified, validation_key, validation_key_expiration, last_forgot_email_password, expires, user_status) FROM stdin;
1	admin	$2y$12$rcKrza0Ok7d/94YRdEs9/.GOu28v3MWshSz/UmDHPYAY5BALMTke2	Administrator	0	en	emmamendez07@gmail.com	default	default	default	\N	1	2024-12-25 22:06:56	2024-12-17 13:27:27.27873	2024-12-25 22:06:56.961267	\N	\N	\N	\N	1
\.


--
-- Name: lime_answer_l10ns_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_answer_l10ns_id_seq', 1, false);


--
-- Name: lime_answers_aid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_answers_aid_seq', 1, false);


--
-- Name: lime_archived_table_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_archived_table_settings_id_seq', 1, false);


--
-- Name: lime_assessments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_assessments_id_seq', 1, false);


--
-- Name: lime_asset_version_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_asset_version_id_seq', 1, false);


--
-- Name: lime_boxes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_boxes_id_seq', 6, true);


--
-- Name: lime_conditions_cid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_conditions_cid_seq', 1, false);


--
-- Name: lime_defaultvalue_l10ns_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_defaultvalue_l10ns_id_seq', 1, false);


--
-- Name: lime_defaultvalues_dvid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_defaultvalues_dvid_seq', 1, false);


--
-- Name: lime_expression_errors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_expression_errors_id_seq', 1, false);


--
-- Name: lime_failed_emails_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_failed_emails_id_seq', 1, false);


--
-- Name: lime_failed_login_attempts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_failed_login_attempts_id_seq', 2, true);


--
-- Name: lime_group_l10ns_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_group_l10ns_id_seq', 5, true);


--
-- Name: lime_groups_gid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_groups_gid_seq', 5, true);


--
-- Name: lime_label_l10ns_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_label_l10ns_id_seq', 1, false);


--
-- Name: lime_labels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_labels_id_seq', 1, false);


--
-- Name: lime_labelsets_lid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_labelsets_lid_seq', 1, false);


--
-- Name: lime_notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_notifications_id_seq', 2, true);


--
-- Name: lime_participant_attribute_names_attribute_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_participant_attribute_names_attribute_id_seq', 3, true);


--
-- Name: lime_participant_attribute_values_value_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_participant_attribute_values_value_id_seq', 1, false);


--
-- Name: lime_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_permissions_id_seq', 13, true);


--
-- Name: lime_permissiontemplates_ptid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_permissiontemplates_ptid_seq', 1, false);


--
-- Name: lime_plugin_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_plugin_settings_id_seq', 1, true);


--
-- Name: lime_plugins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_plugins_id_seq', 17, true);


--
-- Name: lime_question_attributes_qaid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_question_attributes_qaid_seq', 186, true);


--
-- Name: lime_question_l10ns_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_question_l10ns_id_seq', 7, true);


--
-- Name: lime_question_themes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_question_themes_id_seq', 37, true);


--
-- Name: lime_questions_qid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_questions_qid_seq', 7, true);


--
-- Name: lime_quota_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_quota_id_seq', 1, false);


--
-- Name: lime_quota_languagesettings_quotals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_quota_languagesettings_quotals_id_seq', 1, false);


--
-- Name: lime_quota_members_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_quota_members_id_seq', 1, false);


--
-- Name: lime_saved_control_scid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_saved_control_scid_seq', 1, false);


--
-- Name: lime_settings_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_settings_user_id_seq', 2, true);


--
-- Name: lime_source_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_source_message_id_seq', 1, false);


--
-- Name: lime_survey_641746_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_survey_641746_id_seq', 4, true);


--
-- Name: lime_survey_641746_timings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_survey_641746_timings_id_seq', 1, false);


--
-- Name: lime_survey_url_parameters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_survey_url_parameters_id_seq', 1, false);


--
-- Name: lime_surveymenu_entries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_surveymenu_entries_id_seq', 26, true);


--
-- Name: lime_surveymenu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_surveymenu_id_seq', 1, false);


--
-- Name: lime_surveys_groups_gsid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_surveys_groups_gsid_seq', 1, true);


--
-- Name: lime_template_configuration_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_template_configuration_id_seq', 13, true);


--
-- Name: lime_templates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_templates_id_seq', 4, true);


--
-- Name: lime_tokens_641746_tid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_tokens_641746_tid_seq', 1, true);


--
-- Name: lime_tutorial_entries_teid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_tutorial_entries_teid_seq', 1, false);


--
-- Name: lime_tutorials_tid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_tutorials_tid_seq', 1, false);


--
-- Name: lime_user_groups_ugid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_user_groups_ugid_seq', 1, false);


--
-- Name: lime_users_uid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lime_users_uid_seq', 1, true);


--
-- Name: lime_answer_l10ns lime_answer_l10ns_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_answer_l10ns
    ADD CONSTRAINT lime_answer_l10ns_pkey PRIMARY KEY (id);


--
-- Name: lime_answers lime_answers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_answers
    ADD CONSTRAINT lime_answers_pkey PRIMARY KEY (aid);


--
-- Name: lime_archived_table_settings lime_archived_table_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_archived_table_settings
    ADD CONSTRAINT lime_archived_table_settings_pkey PRIMARY KEY (id);


--
-- Name: lime_assessments lime_assessments_composite_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_assessments
    ADD CONSTRAINT lime_assessments_composite_pkey PRIMARY KEY (id, language);


--
-- Name: lime_asset_version lime_asset_version_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_asset_version
    ADD CONSTRAINT lime_asset_version_pkey PRIMARY KEY (id);


--
-- Name: lime_boxes lime_boxes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_boxes
    ADD CONSTRAINT lime_boxes_pkey PRIMARY KEY (id);


--
-- Name: lime_conditions lime_conditions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_conditions
    ADD CONSTRAINT lime_conditions_pkey PRIMARY KEY (cid);


--
-- Name: lime_defaultvalue_l10ns lime_defaultvalue_l10ns_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_defaultvalue_l10ns
    ADD CONSTRAINT lime_defaultvalue_l10ns_pkey PRIMARY KEY (id);


--
-- Name: lime_defaultvalues lime_defaultvalues_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_defaultvalues
    ADD CONSTRAINT lime_defaultvalues_pkey PRIMARY KEY (dvid);


--
-- Name: lime_expression_errors lime_expression_errors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_expression_errors
    ADD CONSTRAINT lime_expression_errors_pkey PRIMARY KEY (id);


--
-- Name: lime_failed_emails lime_failed_emails_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_failed_emails
    ADD CONSTRAINT lime_failed_emails_pkey PRIMARY KEY (id);


--
-- Name: lime_failed_login_attempts lime_failed_login_attempts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_failed_login_attempts
    ADD CONSTRAINT lime_failed_login_attempts_pkey PRIMARY KEY (id);


--
-- Name: lime_group_l10ns lime_group_l10ns_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_group_l10ns
    ADD CONSTRAINT lime_group_l10ns_pkey PRIMARY KEY (id);


--
-- Name: lime_groups lime_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_groups
    ADD CONSTRAINT lime_groups_pkey PRIMARY KEY (gid);


--
-- Name: lime_label_l10ns lime_label_l10ns_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_label_l10ns
    ADD CONSTRAINT lime_label_l10ns_pkey PRIMARY KEY (id);


--
-- Name: lime_labels lime_labels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_labels
    ADD CONSTRAINT lime_labels_pkey PRIMARY KEY (id);


--
-- Name: lime_labelsets lime_labelsets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_labelsets
    ADD CONSTRAINT lime_labelsets_pkey PRIMARY KEY (lid);


--
-- Name: lime_map_tutorial_users lime_map_tutorial_users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_map_tutorial_users
    ADD CONSTRAINT lime_map_tutorial_users_pk PRIMARY KEY (uid, tid);


--
-- Name: lime_message lime_message_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_message
    ADD CONSTRAINT lime_message_pk PRIMARY KEY (id, language);


--
-- Name: lime_notifications lime_notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_notifications
    ADD CONSTRAINT lime_notifications_pkey PRIMARY KEY (id);


--
-- Name: lime_participant_attribute_names lime_participant_attribute_names_composite_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_participant_attribute_names
    ADD CONSTRAINT lime_participant_attribute_names_composite_pkey PRIMARY KEY (attribute_id, attribute_type);


--
-- Name: lime_participant_attribute_names_lang lime_participant_attribute_names_lang_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_participant_attribute_names_lang
    ADD CONSTRAINT lime_participant_attribute_names_lang_pk PRIMARY KEY (attribute_id, lang);


--
-- Name: lime_participant_attribute lime_participant_attribute_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_participant_attribute
    ADD CONSTRAINT lime_participant_attribute_pk PRIMARY KEY (participant_id, attribute_id);


--
-- Name: lime_participant_attribute_values lime_participant_attribute_values_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_participant_attribute_values
    ADD CONSTRAINT lime_participant_attribute_values_pkey PRIMARY KEY (value_id);


--
-- Name: lime_participants lime_participant_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_participants
    ADD CONSTRAINT lime_participant_pk PRIMARY KEY (participant_id);


--
-- Name: lime_participant_shares lime_participant_shares_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_participant_shares
    ADD CONSTRAINT lime_participant_shares_pk PRIMARY KEY (participant_id, share_uid);


--
-- Name: lime_permissions lime_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_permissions
    ADD CONSTRAINT lime_permissions_pkey PRIMARY KEY (id);


--
-- Name: lime_permissiontemplates lime_permissiontemplates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_permissiontemplates
    ADD CONSTRAINT lime_permissiontemplates_pkey PRIMARY KEY (ptid);


--
-- Name: lime_plugin_settings lime_plugin_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_plugin_settings
    ADD CONSTRAINT lime_plugin_settings_pkey PRIMARY KEY (id);


--
-- Name: lime_plugins lime_plugins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_plugins
    ADD CONSTRAINT lime_plugins_pkey PRIMARY KEY (id);


--
-- Name: lime_question_attributes lime_question_attributes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_question_attributes
    ADD CONSTRAINT lime_question_attributes_pkey PRIMARY KEY (qaid);


--
-- Name: lime_question_l10ns lime_question_l10ns_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_question_l10ns
    ADD CONSTRAINT lime_question_l10ns_pkey PRIMARY KEY (id);


--
-- Name: lime_question_themes lime_question_themes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_question_themes
    ADD CONSTRAINT lime_question_themes_pkey PRIMARY KEY (id);


--
-- Name: lime_questions lime_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_questions
    ADD CONSTRAINT lime_questions_pkey PRIMARY KEY (qid);


--
-- Name: lime_quota_languagesettings lime_quota_languagesettings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_quota_languagesettings
    ADD CONSTRAINT lime_quota_languagesettings_pkey PRIMARY KEY (quotals_id);


--
-- Name: lime_quota_members lime_quota_members_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_quota_members
    ADD CONSTRAINT lime_quota_members_pkey PRIMARY KEY (id);


--
-- Name: lime_quota lime_quota_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_quota
    ADD CONSTRAINT lime_quota_pkey PRIMARY KEY (id);


--
-- Name: lime_saved_control lime_saved_control_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_saved_control
    ADD CONSTRAINT lime_saved_control_pkey PRIMARY KEY (scid);


--
-- Name: lime_sessions lime_sessions_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_sessions
    ADD CONSTRAINT lime_sessions_pk PRIMARY KEY (id);


--
-- Name: lime_settings_global lime_settings_global_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_settings_global
    ADD CONSTRAINT lime_settings_global_pk PRIMARY KEY (stg_name);


--
-- Name: lime_settings_user lime_settings_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_settings_user
    ADD CONSTRAINT lime_settings_user_pkey PRIMARY KEY (id);


--
-- Name: lime_source_message lime_source_message_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_source_message
    ADD CONSTRAINT lime_source_message_pkey PRIMARY KEY (id);


--
-- Name: lime_survey_641746 lime_survey_641746_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_survey_641746
    ADD CONSTRAINT lime_survey_641746_pkey PRIMARY KEY (id);


--
-- Name: lime_survey_641746_timings lime_survey_641746_timings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_survey_641746_timings
    ADD CONSTRAINT lime_survey_641746_timings_pkey PRIMARY KEY (id);


--
-- Name: lime_survey_links lime_survey_links_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_survey_links
    ADD CONSTRAINT lime_survey_links_pk PRIMARY KEY (participant_id, token_id, survey_id);


--
-- Name: lime_survey_url_parameters lime_survey_url_parameters_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_survey_url_parameters
    ADD CONSTRAINT lime_survey_url_parameters_pkey PRIMARY KEY (id);


--
-- Name: lime_surveymenu_entries lime_surveymenu_entries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_surveymenu_entries
    ADD CONSTRAINT lime_surveymenu_entries_pkey PRIMARY KEY (id);


--
-- Name: lime_surveymenu lime_surveymenu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_surveymenu
    ADD CONSTRAINT lime_surveymenu_pkey PRIMARY KEY (id);


--
-- Name: lime_surveys_groups lime_surveys_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_surveys_groups
    ADD CONSTRAINT lime_surveys_groups_pkey PRIMARY KEY (gsid);


--
-- Name: lime_surveys_groupsettings lime_surveys_groupsettings_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_surveys_groupsettings
    ADD CONSTRAINT lime_surveys_groupsettings_pk PRIMARY KEY (gsid);


--
-- Name: lime_surveys_languagesettings lime_surveys_languagesettings_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_surveys_languagesettings
    ADD CONSTRAINT lime_surveys_languagesettings_pk PRIMARY KEY (surveyls_survey_id, surveyls_language);


--
-- Name: lime_surveys lime_surveys_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_surveys
    ADD CONSTRAINT lime_surveys_pk PRIMARY KEY (sid);


--
-- Name: lime_template_configuration lime_template_configuration_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_template_configuration
    ADD CONSTRAINT lime_template_configuration_pkey PRIMARY KEY (id);


--
-- Name: lime_templates lime_templates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_templates
    ADD CONSTRAINT lime_templates_pkey PRIMARY KEY (id);


--
-- Name: lime_tokens_641746 lime_tokens_641746_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_tokens_641746
    ADD CONSTRAINT lime_tokens_641746_pkey PRIMARY KEY (tid);


--
-- Name: lime_tutorial_entries lime_tutorial_entries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_tutorial_entries
    ADD CONSTRAINT lime_tutorial_entries_pkey PRIMARY KEY (teid);


--
-- Name: lime_tutorial_entry_relation lime_tutorial_entry_relation_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_tutorial_entry_relation
    ADD CONSTRAINT lime_tutorial_entry_relation_pk PRIMARY KEY (teid, tid);


--
-- Name: lime_tutorials lime_tutorials_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_tutorials
    ADD CONSTRAINT lime_tutorials_pkey PRIMARY KEY (tid);


--
-- Name: lime_user_groups lime_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_user_groups
    ADD CONSTRAINT lime_user_groups_pkey PRIMARY KEY (ugid);


--
-- Name: lime_user_in_groups lime_user_in_groups_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_user_in_groups
    ADD CONSTRAINT lime_user_in_groups_pk PRIMARY KEY (ugid, uid);


--
-- Name: lime_user_in_permissionrole lime_user_in_permissionrole_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_user_in_permissionrole
    ADD CONSTRAINT lime_user_in_permissionrole_pk PRIMARY KEY (ptid, uid);


--
-- Name: lime_users lime_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lime_users
    ADD CONSTRAINT lime_users_pkey PRIMARY KEY (uid);


--
-- Name: idx_email_641746_32276; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_email_641746_32276 ON public.lime_tokens_641746 USING btree (email);


--
-- Name: idx_survey_token_641746_46359; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_survey_token_641746_46359 ON public.lime_survey_641746 USING btree (token);


--
-- Name: idx_token_token_641746_16714; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_token_token_641746_16714 ON public.lime_tokens_641746 USING btree (token);


--
-- Name: lime_answer_l10ns_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX lime_answer_l10ns_idx ON public.lime_answer_l10ns USING btree (aid, language);


--
-- Name: lime_answers_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_answers_idx ON public.lime_answers USING btree (qid, code, scale_id);


--
-- Name: lime_answers_idx2; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_answers_idx2 ON public.lime_answers USING btree (sortorder);


--
-- Name: lime_assessments_idx2; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_assessments_idx2 ON public.lime_assessments USING btree (sid);


--
-- Name: lime_assessments_idx3; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_assessments_idx3 ON public.lime_assessments USING btree (gid);


--
-- Name: lime_conditions_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_conditions_idx ON public.lime_conditions USING btree (qid);


--
-- Name: lime_conditions_idx3; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_conditions_idx3 ON public.lime_conditions USING btree (cqid);


--
-- Name: lime_idx1_defaultvalue; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx1_defaultvalue ON public.lime_defaultvalues USING btree (qid, scale_id, sqid, specialtype);


--
-- Name: lime_idx1_defaultvalue_ls; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx1_defaultvalue_ls ON public.lime_defaultvalue_l10ns USING btree (dvid, language);


--
-- Name: lime_idx1_group_ls; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX lime_idx1_group_ls ON public.lime_group_l10ns USING btree (gid, language);


--
-- Name: lime_idx1_groups; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx1_groups ON public.lime_groups USING btree (sid);


--
-- Name: lime_idx1_labels; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx1_labels ON public.lime_labels USING btree (code);


--
-- Name: lime_idx1_labelsets; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx1_labelsets ON public.lime_labelsets USING btree (owner_id);


--
-- Name: lime_idx1_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX lime_idx1_name ON public.lime_permissiontemplates USING btree (name);


--
-- Name: lime_idx1_notifications; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx1_notifications ON public.lime_notifications USING btree (hash);


--
-- Name: lime_idx1_permissions; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX lime_idx1_permissions ON public.lime_permissions USING btree (entity_id, entity, permission, uid);


--
-- Name: lime_idx1_question_attributes; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx1_question_attributes ON public.lime_question_attributes USING btree (qid);


--
-- Name: lime_idx1_question_ls; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX lime_idx1_question_ls ON public.lime_question_l10ns USING btree (qid, language);


--
-- Name: lime_idx1_question_themes; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx1_question_themes ON public.lime_question_themes USING btree (name);


--
-- Name: lime_idx1_questions; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx1_questions ON public.lime_questions USING btree (sid);


--
-- Name: lime_idx1_quota; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx1_quota ON public.lime_quota USING btree (sid);


--
-- Name: lime_idx1_quota_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx1_quota_id ON public.lime_quota_languagesettings USING btree (quotals_quota_id);


--
-- Name: lime_idx1_quota_members; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX lime_idx1_quota_members ON public.lime_quota_members USING btree (sid, qid, quota_id, code);


--
-- Name: lime_idx1_saved_control; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx1_saved_control ON public.lime_saved_control USING btree (sid);


--
-- Name: lime_idx1_settings_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx1_settings_user ON public.lime_settings_user USING btree (uid);


--
-- Name: lime_idx1_surveymenu_entries; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx1_surveymenu_entries ON public.lime_surveymenu_entries USING btree (menu_id);


--
-- Name: lime_idx1_surveys; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx1_surveys ON public.lime_surveys USING btree (owner_id);


--
-- Name: lime_idx1_surveys_groups; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx1_surveys_groups ON public.lime_surveys_groups USING btree (name);


--
-- Name: lime_idx1_surveys_languagesettings; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx1_surveys_languagesettings ON public.lime_surveys_languagesettings USING btree (surveyls_title);


--
-- Name: lime_idx1_template_configuration; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx1_template_configuration ON public.lime_template_configuration USING btree (template_name);


--
-- Name: lime_idx1_templates; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx1_templates ON public.lime_templates USING btree (name);


--
-- Name: lime_idx1_tutorial_entry_relation; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx1_tutorial_entry_relation ON public.lime_tutorial_entry_relation USING btree (uid);


--
-- Name: lime_idx1_tutorials; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX lime_idx1_tutorials ON public.lime_tutorials USING btree (name);


--
-- Name: lime_idx1_user_groups; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX lime_idx1_user_groups ON public.lime_user_groups USING btree (name);


--
-- Name: lime_idx1_users; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX lime_idx1_users ON public.lime_users USING btree (users_name);


--
-- Name: lime_idx2_labels; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx2_labels ON public.lime_labels USING btree (sortorder);


--
-- Name: lime_idx2_labelsets; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx2_labelsets ON public.lime_labelsets USING btree (lid, owner_id);


--
-- Name: lime_idx2_question_attributes; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx2_question_attributes ON public.lime_question_attributes USING btree (attribute);


--
-- Name: lime_idx2_questions; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx2_questions ON public.lime_questions USING btree (gid);


--
-- Name: lime_idx2_quota_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx2_quota_id ON public.lime_quota_members USING btree (quota_id);


--
-- Name: lime_idx2_saved_control; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx2_saved_control ON public.lime_saved_control USING btree (srid);


--
-- Name: lime_idx2_settings_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx2_settings_user ON public.lime_settings_user USING btree (entity);


--
-- Name: lime_idx2_surveymenu; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx2_surveymenu ON public.lime_surveymenu USING btree (title);


--
-- Name: lime_idx2_surveys; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx2_surveys ON public.lime_surveys USING btree (gsid);


--
-- Name: lime_idx2_surveys_groups; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx2_surveys_groups ON public.lime_surveys_groups USING btree (title);


--
-- Name: lime_idx2_template_configuration; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx2_template_configuration ON public.lime_template_configuration USING btree (sid);


--
-- Name: lime_idx2_templates; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx2_templates ON public.lime_templates USING btree (title);


--
-- Name: lime_idx2_tutorial_entry_relation; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx2_tutorial_entry_relation ON public.lime_tutorial_entry_relation USING btree (sid);


--
-- Name: lime_idx2_users; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx2_users ON public.lime_users USING btree (email);


--
-- Name: lime_idx3_participants; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx3_participants ON public.lime_participants USING btree (language);


--
-- Name: lime_idx3_questions; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx3_questions ON public.lime_questions USING btree (type);


--
-- Name: lime_idx3_settings_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx3_settings_user ON public.lime_settings_user USING btree (entity_id);


--
-- Name: lime_idx3_template_configuration; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx3_template_configuration ON public.lime_template_configuration USING btree (gsid);


--
-- Name: lime_idx3_templates; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx3_templates ON public.lime_templates USING btree (owner_id);


--
-- Name: lime_idx4_labels; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx4_labels ON public.lime_labels USING btree (lid, sortorder);


--
-- Name: lime_idx4_questions; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx4_questions ON public.lime_questions USING btree (title);


--
-- Name: lime_idx4_settings_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx4_settings_user ON public.lime_settings_user USING btree (stg_name);


--
-- Name: lime_idx4_template_configuration; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx4_template_configuration ON public.lime_template_configuration USING btree (uid);


--
-- Name: lime_idx4_templates; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx4_templates ON public.lime_templates USING btree (extends);


--
-- Name: lime_idx5_labels; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX lime_idx5_labels ON public.lime_labels USING btree (lid, code);


--
-- Name: lime_idx5_questions; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx5_questions ON public.lime_questions USING btree (parent_qid);


--
-- Name: lime_idx5_surveymenu_entries; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx5_surveymenu_entries ON public.lime_surveymenu_entries USING btree (menu_title);


--
-- Name: lime_idx_participant_attribute_names; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_idx_participant_attribute_names ON public.lime_participant_attribute_names USING btree (attribute_id, attribute_type);


--
-- Name: lime_notifications_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lime_notifications_pk ON public.lime_notifications USING btree (entity, entity_id, status);


--
-- Name: lime_surveymenu_entries_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX lime_surveymenu_entries_name ON public.lime_surveymenu_entries USING btree (name);


--
-- Name: lime_surveymenu_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX lime_surveymenu_name ON public.lime_surveymenu USING btree (name);


--
-- Name: sess_expire; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX sess_expire ON public.lime_sessions USING btree (expire);


--
-- PostgreSQL database dump complete
--


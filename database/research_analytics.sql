-- KLPS research analytics foundation.
-- Intended for the Railway PostgreSQL backend that owns participants,
-- survey_responses, and voice_recordings.
--
-- Assumptions:
-- - survey_responses.body_areas is jsonb text array
-- - survey_responses.concerns is jsonb object: { "tummy": ["Bloating"] }
-- - survey_responses.spent_money_on and desired_insights are jsonb text arrays
-- - scalar questionnaire columns use snake_case names listed below

create or replace view research_top_body_areas as
select
  body_area,
  count(*)::integer as responses,
  round(
    count(*) * 100.0 / nullif((select count(*) from survey_responses), 0),
    1
  ) as percent
from survey_responses sr
cross join lateral jsonb_array_elements_text(coalesce(sr.body_areas, '[]'::jsonb)) as areas(body_area)
group by body_area
order by responses desc, body_area;

create or replace view research_top_concerns as
select
  concern,
  count(*)::integer as responses,
  round(
    count(*) * 100.0 / nullif((select count(*) from survey_responses), 0),
    1
  ) as percent
from survey_responses sr
cross join lateral jsonb_each(coalesce(sr.concerns, '{}'::jsonb)) as concern_group(body_area, concern_values)
cross join lateral jsonb_array_elements_text(concern_group.concern_values) as concerns(concern)
group by concern
order by responses desc, concern;

create or replace view research_challenge_frequency as
select
  coalesce(nullif(challenge_frequency, ''), nullif(frequency, ''), 'unknown') as challenge_frequency,
  count(*)::integer as responses,
  round(count(*) * 100.0 / nullif((select count(*) from survey_responses), 0), 1) as percent
from survey_responses
group by coalesce(nullif(challenge_frequency, ''), nullif(frequency, ''), 'unknown')
order by responses desc;

create or replace view research_confidence_levels as
select
  coalesce(nullif(confidence_level, ''), 'unknown') as confidence_level,
  count(*)::integer as responses,
  round(count(*) * 100.0 / nullif((select count(*) from survey_responses), 0), 1) as percent
from survey_responses
group by coalesce(nullif(confidence_level, ''), 'unknown')
order by confidence_level;

create or replace view research_willingness_to_pay as
select
  coalesce(nullif(would_pay, ''), 'unknown') as would_pay,
  count(*)::integer as responses,
  round(count(*) * 100.0 / nullif((select count(*) from survey_responses), 0), 1) as percent
from survey_responses
group by coalesce(nullif(would_pay, ''), 'unknown')
order by responses desc;

create or replace view research_money_spent as
select
  coalesce(nullif(spent_money, ''), 'unknown') as spent_money,
  count(*)::integer as responses,
  round(count(*) * 100.0 / nullif((select count(*) from survey_responses), 0), 1) as percent
from survey_responses
group by coalesce(nullif(spent_money, ''), 'unknown')
order by responses desc;

create or replace view research_money_spent_on as
select
  item,
  count(*)::integer as responses,
  round(count(*) * 100.0 / nullif((select count(*) from survey_responses), 0), 1) as percent
from survey_responses sr
cross join lateral jsonb_array_elements_text(coalesce(sr.spent_money_on, '[]'::jsonb)) as items(item)
group by item
order by responses desc, item;

create or replace view research_employment_status as
select
  coalesce(nullif(employment_status, ''), 'unknown') as employment_status,
  count(*)::integer as responses,
  round(count(*) * 100.0 / nullif((select count(*) from survey_responses), 0), 1) as percent
from survey_responses
group by coalesce(nullif(employment_status, ''), 'unknown')
order by responses desc;

create or replace view research_income_bands as
select
  coalesce(nullif(income_band, ''), 'unknown') as income_band,
  count(*)::integer as responses,
  round(count(*) * 100.0 / nullif((select count(*) from survey_responses), 0), 1) as percent
from survey_responses
group by coalesce(nullif(income_band, ''), 'unknown')
order by responses desc;

create or replace view research_life_stage as
select
  coalesce(nullif(life_stage, ''), 'unknown') as life_stage,
  count(*)::integer as responses,
  round(count(*) * 100.0 / nullif((select count(*) from survey_responses), 0), 1) as percent
from survey_responses
group by coalesce(nullif(life_stage, ''), 'unknown')
order by responses desc;

create or replace view research_desired_insights as
select
  insight,
  count(*)::integer as responses,
  round(count(*) * 100.0 / nullif((select count(*) from survey_responses), 0), 1) as percent
from survey_responses sr
cross join lateral jsonb_array_elements_text(coalesce(sr.desired_insights, '[]'::jsonb)) as insights(insight)
group by insight
order by responses desc, insight;

create or replace view research_metrics_summary as
with totals as (
  select count(*)::integer as participants from survey_responses
),
top_concern as (
  select concern, percent from research_top_concerns limit 1
),
top_body_area as (
  select body_area, percent from research_top_body_areas limit 1
),
confidence as (
  select round(avg(nullif(confidence_level, '')::numeric), 1) as average_confidence_level
  from survey_responses
  where nullif(confidence_level, '') ~ '^[0-9]+(\.[0-9]+)?$'
),
spent as (
  select round(count(*) filter (where spent_money = 'yes') * 100.0 / nullif(count(*), 0), 1) as spent_money_percent
  from survey_responses
),
pay as (
  select round(count(*) filter (where would_pay in ('yes', 'maybe')) * 100.0 / nullif(count(*), 0), 1) as would_pay_percent
  from survey_responses
)
select
  totals.participants,
  top_concern.concern as top_concern,
  coalesce(top_concern.percent, 0) as top_concern_percent,
  top_body_area.body_area as top_body_area,
  coalesce(top_body_area.percent, 0) as top_body_area_percent,
  coalesce(spent.spent_money_percent, 0) as spent_money_percent,
  coalesce(pay.would_pay_percent, 0) as would_pay_percent,
  confidence.average_confidence_level
from totals
left join top_concern on true
left join top_body_area on true
left join confidence on true
left join spent on true
left join pay on true;

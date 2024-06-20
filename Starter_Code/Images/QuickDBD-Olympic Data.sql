-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/U7sVQ4
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "athlete_events" (
    "ID" int   NOT NULL,
    "Name" varchar(30)   NOT NULL,
    "Sex" varchar(1)   NOT NULL,
    "Age" int   NOT NULL,
    "Height" varchar(10)   NOT NULL,
    "Weight" varchar(10)   NOT NULL,
    "Team" varchar(15)   NOT NULL,
    "NOC" varchar(3)   NOT NULL,
    "Games" varchar(20)   NOT NULL,
    "Year" int   NOT NULL,
    "Season" varchar(7)   NOT NULL,
    "City" varchar(20)   NOT NULL,
    "Sport" varchar(20)   NOT NULL,
    "Event" varchar(30)   NOT NULL,
    "Medal" varchar(10)   NOT NULL,
    CONSTRAINT "pk_athlete_events" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "noc_regions" (
    "NOC" varchar(3)   NOT NULL,
    "region" varchar(30)   NOT NULL,
    "notes" varchar(30)   NOT NULL,
    CONSTRAINT "pk_noc_regions" PRIMARY KEY (
        "NOC"
     )
);

ALTER TABLE "athlete_events" ADD CONSTRAINT "fk_athlete_events_NOC" FOREIGN KEY("NOC")
REFERENCES "noc_regions" ("NOC");


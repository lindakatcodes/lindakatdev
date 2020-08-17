---
title: 'How to GraphQL Course'
blurb: My thoughts and notes while going through the How to GraphQL course with my Party Corgi adventure club!
tags:
  - GraphQL
---

These notes are based off the [How to GraphQL courses](https://www.howtographql.com/) that I'm going through with the Party Corgi adventure club!

## Introduction

GraphQL (gql): a new API standard, meant to be a more efficient & flexible alternative to REST.

Gql enables declarative data fetching & exposes single endpoint in response to queries. It's meant to be a way for a client to ask specifically for the data it needs, and get that information back on one endpoint instead of a number of different requests.

An API is a way for client devices to get & load data from a server.

**Gql is a query language, not a database! It's db agnostic & can be used effectively with any API context.**

3 factors that impact how API's are designed in today's landscape:

- *Increased mobile usage.* Gql minimizes the amount of data that needs to be transferred, making it more efficient
- *Front end framework variety.* It's difficult to make API's fit requirements of so many different options - gql helps
- *Fast development.* Continuous deployment & rapid iterations can get tricky with REST options

Gql isn't just for react - can be used with any language or framework!

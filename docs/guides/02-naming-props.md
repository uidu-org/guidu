# Naming props

We all know naming is the hardest thing in this industry, so this is designed to help with that in the context of props.

## Problem

You have a property that needs a name and you hate bikeshedding.

## Solution

Depending on the type of property you are naming, the conventions will be different.

### Boolean

Generally, boolean props should be named using [auxilliary verbs](https://en.wikipedia.org/wiki/Auxiliary_verb) such as `does`, `has`, `is` and `should`. Usually we prefix our props with one of these. For example `isDisabled` as opposed to using just `disabled`. React itself uses this (i.e. `shouldComponentUpdate`).

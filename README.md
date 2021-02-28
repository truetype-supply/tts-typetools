<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of content**

-   [Typetools](#typetools)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Typetools

## A react.js component, context, and hook for parse opentype font.

## Usage

```
import { ProviderTypetools } from "typetools";

const defaultFonts: string[] = [
    "/path/to/font.ttf",
];

<ProviderTypetools fonts={defaultFonts}>
    {children}
</ProviderTypetools>
```

-   The font urls above can be url from your static site or for outside origin
-   If you use urls from outside origin, make sure the url provider allowed
-   e.g. https://example.com/assets/example.otf

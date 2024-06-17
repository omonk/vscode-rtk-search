# VSCode RTK Search

Use this plugin to quickly search for RTK endpoints definitions from their RTK Hook.

## Why? 

I personally use `cmd + click` to jump to definition a lot in my workflow. With RTK the decalred endpoint name vs. the returned hook function are different which makes jump to definition not possible.

This plugin aims to provide a faster way to find the endpoint definition using a simple regex and searching.

## Installation and usage

Clone the repo then

```
npm install
```

```
npm run package-and-install
```

In your VScode hit `cmd + shit + P` and you can now run `Get endpoint from RTK hook`. 

Running the command on a hook definition will add the endpoint name to the search bar for you to find easily.

If nothing can found you'll see a message pop up telling you.

## Finding an endpoint

![2024-06-17 09 10 12](https://github.com/omonk/vscode-rtk-search/assets/7108120/1be408f2-1df0-4c63-a29f-7e35c0ec4e73)

## Error message

![2024-06-17 09 10 27](https://github.com/omonk/vscode-rtk-search/assets/7108120/f9e6fb88-f17c-46f7-b570-791552848661)


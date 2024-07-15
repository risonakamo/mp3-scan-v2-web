import Index from "./index.svelte";

function main():void
{
    new Index({
        target:document.body
    });
}

window.onload=main;
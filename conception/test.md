# different test

## in map.ts

Will show the map in term of number

console.log(
"[MAP]\n" +
map
.map((row) => row.map((c) => c.toString()).join(""))
.join("\n")
);

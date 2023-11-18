const all_warehouse = Array.from({ length: 200 }, (_, index) => ({
    id: `#${1237 + index}`,
    email: `user${1237 + index}@reqres.in`,
    name: `Location ${1237 + index}`,
    leader: `Leader ${1237 + index}`
}))
export default all_warehouse;

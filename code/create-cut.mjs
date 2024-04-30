import fs from 'fs'

const raw = String(fs.readFileSync(process.argv[2]))

const dogs = new Map()

const lines = raw.split("\n").filter((l) => l.trim())

let dog_num = 0
let dog_lines = [""]

for ( const l of lines ) {
  const tmp = l.match(/^([0-9]+) - (.*)$/)

  if ( tmp ) {
    if ( dog_num ) {
      dogs.set(dog_num, dog_lines.join("\n"))
      dog_lines = [""]
    }

    dog_num = parseInt(tmp[1])
  }

  dog_lines.push(l)
}

let out = ""

for ( const dn of process.argv.slice(4) ) {
  out += dogs.get(parseInt(dn)) + "\n"
}

fs.writeFileSync(process.argv[3], out)

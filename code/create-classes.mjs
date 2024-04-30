import fs from 'fs'

const filename = process.argv[2]
const outdir = process.argv[3]

function to_title(str) {
  const bits = str
    .replaceAll("(*) ", "")
    .split(" ").map((s) => s.trim())

  bits.forEach((bit, index) => {
    for ( const chr of bit ) {
      if ( "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(chr) >= 0 ) {
        bits[index] = bit[0].toUpperCase() + bit.substr(1).toLowerCase()
        return
      }
    }
  })

  return bits.join(" ")
}

const WRAP_LEN = 34

function clean(str) {
  if ( ! str || str.toUpperCase().indexOf("BRACE ") === 0 ) return str
  if ( str.toUpperCase().indexOf("TEAM ") === 0 ) return str

  const bits = str
    .replace(/( )+/g, ' ')
    .replaceAll("(*) ", "")
    .split(" ").map((s) => s.trim())

  bits[0] = bits[0].replace(/[^A-Za-z0-9]/g, '') + ' -'

  if ( bits.length < 3 ) console.log(str, bits)

  const reg = bits[bits.length - 2].replace(".", "")
  const bday = bits[bits.length - 1]

  let to_join = []
  let line = ""

  for ( const word of bits.slice(0, -2) ) {
    if ( line.length > WRAP_LEN ) {
      to_join.push(line)
      line = "      "
    }

    line += word + " "
  }

  to_join.push(line)

  let out = to_join.join("\n")
  out += `\n      ${reg}\n`

  return out
}

const lines = String(fs.readFileSync(filename)).replaceAll("\t", " ").split("\n")
let cur_fn
let cur_lines = [""]

for ( const line of lines ) {
  if ( line.indexOf("WHIPPETS, ") === 0 ) {
    if ( cur_lines.length && cur_fn ) {
      fs.writeFileSync(`${outdir}/${cur_fn}`, cur_lines.join("\n"))
    }

    cur_lines = [""]
    cur_fn = to_title(line.replace("WHIPPETS, ", "")) + ".txt"

    continue
  }

  if ( line.indexOf("____") >= 0 || line.toUpperCase().indexOf("POINT SCALE") >= 0 ) continue

  cur_lines.push(clean(line))
}

if ( cur_lines.length && cur_fn ) {
  fs.writeFileSync(`${outdir}/${cur_fn}`, cur_lines.join("\n"))
}

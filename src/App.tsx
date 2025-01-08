import { useState } from 'react';
import './App.css'

/**
 * Here is the input data
 * The consanants for each line in different types of representations
 * 
 */
const dataArr = [
  // Entire consanants from the wall, in the order they are drawn + BESTLONGDOG consanants at the end
  `ZGGYHRCLSRNYSHDW
SMSMKPLYBWSRJS
KHLDKTLCMLLYTKNN
CNDYTTSPHNCRMNTN
BNTLYPXLHNTRNGS
FRNKLNTTBSTLNGDG`,

  // 4x4 grid of consanants from the first line on the wall
  `
ZGGY
HRCL
SRNY
SHDW
`,
  // 4x4 grid of consanants from the second line on the wall
  `
SMSM
KPLY
BWSR
JS
`,
  // 4x4 grid of consanants from the third line on the wall
  `
KHLD
KTLC
MLLY
TKNN
`,
  // 4x4 grid of consanants from the fourth line on the wall
  `
CNDY
TTSP
HNCR
MNTN
`,
  // 4x4 grid of consanants from the fifth line on the wall
  `
BNTL
YPXL
HNTR
NGS
`,
  // 4x4 grid of consanants from the sixth line on the wall
  `
FRNK
LNTT
BSTL
NGDG
`,
  // All of the 4x4 grids of consanants in a horizontal list (only what is on the wall)
  `
ZGGYSMSMKHLDCNDYBNTLFRNK
HRCLKPLYKTLCTTSPYPXLLNTT
SRNYBWSRMLLYHNCRHNTR
SHDWJS  TKNNMNTNNGS
`
]


/**
 * Here you can define all the maps for letters
 * Each letter represents a 2x2 grid of cells
 * Each cell is a boolean value
 * The first two values represent the top left and top right cells (if draw order is normal)
 * The second two values represent the bottom left and bottom right cells (if draw order is normal)
 */

const LETTER_MAPS = [
  {
    "K": [0, 0, 0, 0],
    "L": [0, 0, 0, 1],
    "M": [0, 0, 1, 0],
    "N": [0, 0, 1, 1],
    "P": [0, 1, 0, 0],
    "R": [0, 1, 0, 1],
    "S": [0, 1, 1, 0],
    "T": [0, 1, 1, 1],
    "Y": [1, 0, 0, 0],
    "B": [1, 0, 0, 1],
    "C": [1, 0, 1, 0],
    "D": [1, 0, 1, 1],
    "F": [1, 1, 0, 0],
    "G": [1, 1, 0, 1],
    "H": [1, 1, 1, 0],
    "J": [1, 1, 1, 1],
  },
  {
    "B": [0, 0, 0, 0],
    "C": [0, 0, 0, 1],
    "D": [0, 0, 1, 0],
    "F": [0, 0, 1, 1],
    "G": [0, 1, 0, 0],
    "H": [0, 1, 0, 1],
    "J": [0, 1, 1, 0],
    "K": [0, 1, 1, 1],
    "L": [1, 0, 0, 0],
    "M": [1, 0, 0, 1],
    "N": [1, 0, 1, 0],
    "P": [1, 0, 1, 1],
    "R": [1, 1, 0, 0],
    "S": [1, 1, 0, 1],
    "T": [1, 1, 1, 0],
    "W": [1, 1, 1, 1],
    "X": [0, 0, 0, 0],
    "Y": [0, 0, 0, 1],
    "Z": [0, 0, 1, 0],
  },
  {
    "B": [0, 0, 0, 0],
    "C": [0, 0, 0, 1],
    "D": [0, 0, 1, 0],
    "G": [0, 0, 1, 1],
    "H": [0, 1, 0, 0],
    "J": [0, 1, 0, 1],
    "K": [0, 1, 1, 0],
    "L": [0, 1, 1, 1],
    "N": [1, 0, 0, 0],
    "P": [1, 0, 0, 1],
    "R": [1, 0, 1, 0],
    "S": [1, 0, 1, 1],
    "T": [1, 1, 0, 0],
    "W": [1, 1, 1, 0],
    "X": [1, 1, 1, 1],
    "Y": [1, 1, 1, 1],
  },
  {
    "B": [0, 0, 0, 0],
    "C": [0, 0, 0, 1],
    "D": [0, 0, 1, 0],
    "G": [0, 0, 1, 1],
    "J": [0, 1, 0, 0],
    "K": [0, 1, 0, 1],
    "L": [0, 1, 1, 0],
    "N": [0, 1, 1, 1],
    "P": [1, 0, 0, 0],
    "S": [1, 0, 0, 1],
    "T": [1, 0, 1, 0],
    "X": [1, 0, 1, 1],
    "H": [1, 1, 0, 0],
    "R": [1, 1, 0, 1],
    "W": [1, 1, 1, 0],
    "Y": [1, 1, 1, 1],
  },
  // Entire alphabet starting f
  {
    "F": [0, 0, 0, 0],
    "G": [0, 0, 0, 1],
    "H": [0, 0, 1, 0],
    "I": [0, 0, 1, 1],
    "J": [0, 1, 0, 0],
    "K": [0, 1, 0, 1],
    "L": [0, 1, 1, 0],
    "M": [0, 1, 1, 1],
    "N": [1, 0, 0, 0],
    "O": [1, 0, 0, 1],
    "P": [1, 0, 1, 0],
    "Q": [1, 0, 1, 1],
    "R": [1, 1, 0, 0],
    "S": [1, 1, 0, 1],
    "T": [1, 1, 1, 0],
    "U": [1, 1, 1, 1],
    "V": [0, 0, 0, 0],
    "W": [0, 0, 0, 1],
    "X": [0, 0, 1, 0],
    "Y": [0, 0, 1, 1],
    "Z": [0, 1, 0, 0],
    "B": [0, 1, 1, 1],
    "C": [1, 0, 0, 0],
    "D": [1, 0, 0, 1],
    "E": [1, 0, 1, 0],
  },
  // Entire alphabet normal
  {
    "A": [0, 0, 0, 1],
    "B": [0, 0, 1, 0],
    "C": [0, 0, 1, 1],
    "D": [0, 1, 0, 0],
    "E": [0, 1, 0, 1],
    "F": [0, 1, 1, 0],
    "G": [0, 1, 1, 1],
    "H": [1, 0, 0, 0],
    "I": [1, 0, 0, 1],
    "J": [1, 0, 1, 0],
    "K": [1, 0, 1, 1],
    "L": [1, 1, 0, 0],
    "M": [1, 1, 0, 1],
    "N": [1, 1, 1, 0],
    "O": [1, 1, 1, 1],
    "P": [0, 0, 0, 0],
    "Q": [0, 0, 0, 1],
    "R": [0, 0, 1, 0],
    "S": [0, 0, 1, 1],
    "T": [0, 1, 0, 0],
    "U": [0, 1, 0, 1],
    "V": [0, 1, 1, 0],
    "W": [0, 1, 1, 1],
    "X": [1, 0, 0, 0],
    "Y": [1, 0, 0, 1],
    "Z": [1, 0, 1, 0],
  },
  // Entire alphabet normal start 0
  {
    "A": [0, 0, 0, 0],
    "B": [0, 0, 0, 1],
    "C": [0, 0, 1, 0],
    "D": [0, 0, 1, 1],
    "E": [0, 1, 0, 0],
    "F": [0, 1, 0, 1],
    "G": [0, 1, 1, 0],
    "H": [0, 1, 1, 1],
    "I": [1, 0, 0, 0],
    "J": [1, 0, 0, 1],
    "K": [1, 0, 1, 0],
    "L": [1, 0, 1, 1],
    "M": [1, 1, 0, 0],
    "N": [1, 1, 0, 1],
    "O": [1, 1, 1, 0],
    "P": [1, 1, 1, 1],
    "Q": [0, 0, 0, 0],
    "R": [0, 0, 0, 1],
    "S": [0, 0, 1, 0],
    "T": [0, 0, 1, 1],
    "U": [0, 1, 0, 0],
    "V": [0, 1, 0, 1],
    "W": [0, 1, 1, 0],
    "X": [0, 1, 1, 1],
    "Y": [1, 0, 0, 0],
    "Z": [1, 0, 0, 1],
  },
  // Entire alphabet in circle
  {
    "A": [0, 0, 0, 1],
    "C": [0, 0, 1, 0],
    "E": [0, 0, 1, 1],
    "G": [0, 1, 0, 0],
    "I": [0, 1, 0, 1],
    "K": [0, 1, 1, 0],
    "M": [0, 1, 1, 1],
    "O": [1, 0, 0, 0],
    "Q": [1, 0, 0, 1],
    "S": [1, 0, 1, 0],
    "U": [1, 0, 1, 1],
    "W": [1, 1, 0, 0],
    "Y": [1, 1, 0, 1],
    "Z": [1, 1, 1, 0],
    "X": [1, 1, 1, 1],
    "V": [0, 0, 0, 0],
    "T": [0, 0, 0, 1],
    "R": [0, 0, 1, 0],
    "P": [0, 0, 1, 1],
    "N": [0, 1, 0, 0],
    "L": [0, 1, 0, 1],
    "J": [0, 1, 1, 0],
    "H": [0, 1, 1, 1],
    "F": [1, 0, 0, 0],
    "D": [1, 0, 0, 1],
    "B": [1, 0, 1, 0]
  },
  // Entire alphabet in circle start 0
  {
    "A": [0, 0, 0, 0],
    "C": [0, 0, 0, 1],
    "E": [0, 0, 1, 0],
    "G": [0, 0, 1, 1],
    "I": [0, 1, 0, 0],
    "K": [0, 1, 0, 1],
    "M": [0, 1, 1, 0],
    "O": [0, 1, 1, 1],
    "Q": [1, 0, 0, 0],
    "S": [1, 0, 0, 1],
    "U": [1, 0, 1, 0],
    "W": [1, 0, 1, 1],
    "Y": [1, 1, 0, 0],
    "Z": [1, 1, 0, 1],
    "X": [1, 1, 1, 0],
    "V": [1, 1, 1, 1],
    "T": [0, 0, 0, 0],
    "R": [0, 0, 0, 1],
    "P": [0, 0, 1, 0],
    "N": [0, 0, 1, 1],
    "L": [0, 1, 0, 0],
    "J": [0, 1, 0, 1],
    "H": [0, 1, 1, 0],
    "F": [0, 1, 1, 1],
    "D": [1, 0, 0, 0],
    "B": [1, 0, 0, 1],
  },
  // Consonants normal
  {
    "B": [0, 0, 0, 0],
    "C": [0, 0, 0, 1],
    "D": [0, 0, 1, 0],
    "G": [0, 0, 1, 1],
    "J": [0, 1, 0, 0],
    "K": [0, 1, 0, 1],
    "L": [0, 1, 1, 0],
    "M": [0, 1, 1, 1],
    "N": [1, 0, 0, 0],
    "P": [1, 0, 0, 1],
    "S": [1, 0, 1, 0],
    "T": [1, 0, 1, 1],
    "X": [1, 1, 0, 0],
    "H": [1, 1, 0, 1],
    "R": [1, 1, 1, 0],
    "W": [1, 1, 1, 1],
    "Y": [0, 0, 1, 0],
  },
  // Alphabet without non showing letters
  {
    "A": [0, 0, 0, 1],
    "B": [0, 0, 1, 0],
    "C": [0, 0, 1, 1],
    "D": [0, 1, 0, 0],
    "E": [0, 1, 0, 1],
    "F": [0, 1, 1, 0],
    "G": [0, 1, 1, 1],
    "H": [1, 0, 0, 0],
    "I": [1, 0, 0, 1],
    "J": [1, 0, 1, 0],
    "K": [1, 0, 1, 1],
    "L": [1, 1, 0, 0],
    "M": [1, 1, 0, 1],
    "N": [1, 1, 1, 0],
    "O": [1, 1, 1, 1],
    "P": [0, 0, 0, 0],
    "R": [0, 0, 1, 0],
    "S": [0, 0, 1, 1],
    "T": [0, 1, 0, 0],
    "U": [0, 1, 0, 1],
    "W": [0, 1, 1, 1],
    "X": [1, 0, 0, 0],
    "Y": [1, 0, 0, 1],
    "Z": [1, 0, 1, 0],
  },
  // Alphabet without start 0
  {
    "A": [0, 0, 0, 0],
    "B": [0, 0, 0, 1],
    "C": [0, 0, 1, 0],
    "D": [0, 0, 1, 1],
    "E": [0, 1, 0, 0],
    "F": [0, 1, 0, 1],
    "G": [0, 1, 1, 0],
    "H": [0, 1, 1, 1],
    "I": [1, 0, 0, 0],
    "J": [1, 0, 0, 1],
    "K": [1, 0, 1, 0],
    "L": [1, 0, 1, 1],
    "M": [1, 1, 0, 0],
    "N": [1, 1, 0, 1],
    "O": [1, 1, 1, 0],
    "P": [1, 1, 1, 1],
    "R": [0, 0, 0, 0],
    "S": [0, 0, 1, 0],
    "T": [0, 0, 1, 1],
    "U": [0, 1, 0, 0],
    "W": [0, 1, 0, 1],
    "X": [0, 1, 1, 1],
    "Y": [1, 0, 0, 0],
    "Z": [1, 0, 0, 1],
  },
  // Alphabet without non showing letters
  {
    "A": [0, 0, 0, 1],
    "B": [0, 0, 1, 0],
    "C": [0, 0, 1, 1],
    "D": [0, 1, 0, 0],
    "E": [0, 1, 0, 1],
    "F": [0, 1, 1, 0],
    "G": [0, 1, 1, 1],
    "H": [1, 0, 0, 0],
    "I": [1, 0, 0, 1],
    "J": [1, 0, 1, 0],
    "K": [1, 0, 1, 1],
    "L": [1, 1, 0, 0],
    "M": [1, 1, 0, 1],
    "N": [1, 1, 1, 0],
    "O": [1, 1, 1, 1],
    "P": [0, 0, 0, 1],
    "R": [0, 0, 1, 0],
    "S": [0, 0, 1, 1],
    "T": [0, 1, 0, 0],
    "U": [0, 1, 0, 1],
    "W": [0, 1, 1, 0],
    "X": [0, 1, 1, 1],
    "Y": [1, 0, 0, 0],
    "Z": [1, 0, 0, 1],
  },
  {
    "F": [0, 0, 0, 0],
    "G": [0, 0, 0, 1],
    "H": [0, 0, 1, 0],
    "J": [0, 0, 1, 1],
    "K": [0, 1, 0, 0],
    "L": [0, 1, 0, 1],
    "M": [0, 1, 1, 0],
    "N": [0, 1, 1, 1],
    "P": [1, 0, 0, 0],
    "R": [1, 0, 0, 1],
    "S": [1, 0, 1, 0],
    "T": [1, 0, 1, 1],
    "W": [1, 1, 0, 0],
    "X": [1, 1, 0, 1],
    "Y": [1, 1, 1, 0],
    "Z": [1, 1, 1, 1],
    "B": [0, 0, 0, 0],
    "C": [0, 0, 0, 1],
    "D": [0, 0, 1, 0],
  }
].map(letterMap => Object.fromEntries(Object.entries(letterMap).map(([key, value]) => [key, value.map((v: number) => v === 1 ? true : v === 0 ? false : null)])))

const CELL_SIZE = 16

interface LetterMap {
  [key: string]: boolean[];
}

interface LetterMapWithNull {
  [key: string]: boolean[] | null[] | null | undefined;
}

interface CellProps {
  letter: string
  letterMap: LetterMapWithNull
  mapOffset: number
  drawOrder: 'normal' | 'vertical' | 'circular' // Normal draws cell top left, top right, bottom left, bottom right. Vertical draws top left, bottom left, top right, bottom right. Circular draws top left, top right, bottom right, bottom left.
}

const findNextLetterFromMap = (letterMap: LetterMapWithNull, letter: string, offset: number) => {
  const indexOfCurrentMap = Object.keys(letterMap).findIndex(mapKey => mapKey === letter)
  const indexOfOffsetLetter = (indexOfCurrentMap + offset) % Object.keys(letterMap).length;
  const keyAtIndex = Object.keys(letterMap)[indexOfOffsetLetter];
  return keyAtIndex
}

const findMapOffset = (letterMap: LetterMapWithNull, letter: string, offset: number) => {
  const offsetLetter = findNextLetterFromMap(letterMap, letter, offset);
  return letterMap[offsetLetter];
}

const Cell = ({ letter, letterMap, mapOffset, drawOrder }: CellProps) => {
  const output = letter !== "" ? findMapOffset(letterMap, letter, mapOffset) : [false, false, false, false]
  return (
    <span key={letter} style={{ display: "inline-block", width: CELL_SIZE, height: CELL_SIZE, padding: '2px' }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px" }}>
        {drawOrder === 'normal' && (
          <>
            {/* Normal */}
            <span style={{ display: "inline-block", width: CELL_SIZE / 2, height: CELL_SIZE / 2, backgroundColor: output?.[0] === true ? 'red' : output?.[0] === false ? 'white' : 'gray' }} />
            <span style={{ display: "inline-block", width: CELL_SIZE / 2, height: CELL_SIZE / 2, backgroundColor: output?.[1] === true ? 'red' : output?.[1] === false ? 'white' : 'gray' }} />
            <span style={{ display: "inline-block", width: CELL_SIZE / 2, height: CELL_SIZE / 2, backgroundColor: output?.[2] === true ? 'red' : output?.[2] === false ? 'white' : 'gray' }} />
            <span style={{ display: "inline-block", width: CELL_SIZE / 2, height: CELL_SIZE / 2, backgroundColor: output?.[3] === true ? 'red' : output?.[3] === false ? 'white' : 'gray' }} />
          </>
        )}

        {/* Vertical */}
        {drawOrder === 'vertical' && (
          <>
            <span style={{ display: "inline-block", width: CELL_SIZE / 2, height: CELL_SIZE / 2, backgroundColor: output?.[0] === true ? 'red' : output?.[0] === false ? 'white' : 'gray' }} />
            <span style={{ display: "inline-block", width: CELL_SIZE / 2, height: CELL_SIZE / 2, backgroundColor: output?.[2] === true ? 'red' : output?.[2] === false ? 'white' : 'gray' }} />
            <span style={{ display: "inline-block", width: CELL_SIZE / 2, height: CELL_SIZE / 2, backgroundColor: output?.[1] === true ? 'red' : output?.[1] === false ? 'white' : 'gray' }} />
            <span style={{ display: "inline-block", width: CELL_SIZE / 2, height: CELL_SIZE / 2, backgroundColor: output?.[3] === true ? 'red' : output?.[3] === false ? 'white' : 'gray' }} />
          </>
        )}

        {/* Horizontal */}
        {drawOrder === 'circular' && (
          <>
            <span style={{ display: "inline-block", width: CELL_SIZE / 2, height: CELL_SIZE / 2, backgroundColor: output?.[0] === true ? 'red' : output?.[0] === false ? 'white' : 'gray' }} />
            <span style={{ display: "inline-block", width: CELL_SIZE / 2, height: CELL_SIZE / 2, backgroundColor: output?.[1] === true ? 'red' : output?.[1] === false ? 'white' : 'gray' }} />
            <span style={{ display: "inline-block", width: CELL_SIZE / 2, height: CELL_SIZE / 2, backgroundColor: output?.[3] === true ? 'red' : output?.[3] === false ? 'white' : 'gray' }} />
            <span style={{ display: "inline-block", width: CELL_SIZE / 2, height: CELL_SIZE / 2, backgroundColor: output?.[2] === true ? 'red' : output?.[2] === false ? 'white' : 'gray' }} />
          </>
        )}
      </div>
    </span>
  )
}


const fillLetterMapWithMissingData = (letterMap: LetterMapWithNull): LetterMap => {
  const result: LetterMap = {};
  Object.keys(letterMap).forEach(key => {
    const value = letterMap[key];
    result[key] = Array.isArray(value) && value.some(v => v !== null) ?
      value.map(v => !!v) : [false, false, false, false];
  });
  return result;
}

function App() {
  const [mapOffset, setMapOffset] = useState(0)
  const [drawOrder, setDrawOrder] = useState<'normal' | 'vertical' | 'circular'>('normal')
  return (
    <>
      <button style={{ position: 'fixed', top: '10px', left: '10px', backgroundColor: 'black', color: 'white', padding: '10px 20px', margin: '10px', borderRadius: '20px', cursor: 'pointer' }} onClick={() => setMapOffset(mapOffset - 1)}>Shift back</button>
      <button style={{ position: 'fixed', top: '10px', left: '140px', backgroundColor: 'black', color: 'white', padding: '10px 20px', margin: '10px', borderRadius: '20px', cursor: 'pointer' }} onClick={() => setMapOffset(mapOffset + 1)}>Shift forward</button>
      <button style={{ position: 'fixed', top: '50px', left: '10px', backgroundColor: 'black', color: 'white', padding: '10px 20px', margin: '10px', borderRadius: '20px', cursor: 'pointer' }} onClick={() => setDrawOrder(drawOrder === 'normal' ? 'circular' : drawOrder === 'circular' ? 'vertical' : 'normal')}>Draw order {drawOrder}</button>
      {dataArr.map((data, dataIndex) => (
        <span key={dataIndex} style={{ display: "inline-block", padding: "12px" }}>
          {LETTER_MAPS.map((letterMap, letterIndex) => (
            <>
              <span style={{ display: "block", padding: "4px" }}>
                {data.split('\n').map(line => line.split('')).map((row, objectIndex) => (
                  <div key={dataIndex.toString() + letterIndex.toString() + objectIndex.toString()} style={{ textAlign: 'left', height: CELL_SIZE, padding: '2px' }}>
                    {row.map((cell) => (
                      <Cell letter={cell} letterMap={fillLetterMapWithMissingData(letterMap)} mapOffset={mapOffset} drawOrder={drawOrder} />
                    ))}
                  </div>
                ))}
              </span>
            </>
          ))}
        </span>
      ))}
    </>
  )
}

export default App

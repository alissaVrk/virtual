import React from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import { useMeasure } from '@react-hookz/web/esm'
import { useVirtualizer } from '@tanstack/react-virtual'

function App() {
  const parentRef = React.useRef<HTMLDivElement>(null)
  const [theadSize, theadRef] = useMeasure<HTMLTableSectionElement>()

  const rowVirtualizer = useVirtualizer({
    count: 10000,
    getScrollElement: () => parentRef.current,
    estimateSize: React.useCallback(() => 35, []),
    overscan: 5,
    paddingStart: theadSize?.height ?? 0,
    scrollPaddingStart: theadSize?.height ?? 0,
  })

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={() => {
            rowVirtualizer.scrollToIndex(40)
          }}
          className="border border-black"
        >
          Scroll to index 40
        </button>
        <button
          onClick={() => {
            rowVirtualizer.scrollToIndex(20)
          }}
          className="border border-black"
        >
          Then scroll to index 20
        </button>
      </div>

      <br />
      <br />

      <div
        ref={parentRef}
        className="List"
        style={{
          height: `200px`,
          width: `400px`,
          overflow: 'auto',
        }}
      >
        <table
          style={{
            height: `${rowVirtualizer.totalSize}px`,
            width: '100%',
          }}
        >
          <thead ref={theadRef}>
            <tr>
              <th>Index</th>
              <th>Key</th>
            </tr>
          </thead>
          <tbody>
            {rowVirtualizer.virtualItems.map((virtualRow) => (
              <tr
                key={virtualRow.index}
                className={
                  virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'
                }
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <td>#{virtualRow.index}</td>
                <td>{virtualRow.key}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {process.env.NODE_ENV === 'development' ? (
        <p>
          <strong>Notice:</strong> You are currently running React in
          development mode. Rendering performance will be slightly degraded
          until this application is build for production.
        </p>
      ) : null}
    </>
  )
}

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

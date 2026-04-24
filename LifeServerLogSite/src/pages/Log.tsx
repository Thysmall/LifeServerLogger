import { useState, useEffect, useMemo, Key, ReactNode } from 'react'
import '../Log.css'
import Nav from '../components/Nav.jsx'
import React from 'react';

//Use later to pretify
import {useReactTable, getCoreRowModel, flexRender, createColumnHelper, Getter, ColumnDef, getSortedRowModel, SortingState} from '@tanstack/react-table';




type LogInstance = {
  id: Key,
  victimName: String,
  killerName: String,
  message: String,
  timestamp: EpochTimeStamp,
  victimNewLives: ReactNode,
  description: String
}

const columnHelper = createColumnHelper<LogInstance>()

const fetchURL = import.meta.env.VITE_SERVER_IP
function Log() {

  
  const columns = useMemo<ColumnDef<LogInstance, any>[]>(() =>[
    columnHelper.accessor('victimName', {
      cell: (info) => info.getValue(), 
      header: () => <span>Victim</span>,
      sortingFn: 'alphanumeric',
      invertSorting: true,
      enableMultiSort: true,
    }),
    columnHelper.accessor('killerName', {
      cell: (info) => info.getValue(), 
      header: () => <span>Killer</span>,
      sortingFn: "alphanumeric",
      invertSorting: true,
      enableMultiSort: true,
    }),
    columnHelper.accessor('message', {
      cell: (info) => info.getValue(), 
      header: () => <span>Death Message</span>,
      sortingFn: 'alphanumeric',
      invertSorting: true,
      enableMultiSort: true,
    }),
    columnHelper.accessor('timestamp', {
      cell: (info) => info.getValue(), 
      header: () => <span>Timestamp</span>,
      sortingFn: 'datetime',
      enableMultiSort: true,
    }),
    columnHelper.accessor('victimNewLives', {
      cell: (info) => info.getValue(), 
      header: () => <span>New Lives</span>,
      sortingFn: 'basic',
      enableMultiSort: true,
    }),
    columnHelper.accessor('description', {
      cell: (info) => info.getValue(), 
      header: () => <span>Description</span>,
      enableSorting: false
    }),
    columnHelper.accessor('id', {
      cell: (info) => (<><div><button onClick={() => handleDelete(info.getValue())}>Delete</button>
      </div><button onClick={() => handlePatch(info.getValue())}>Add Description</button></>), 
      header: () => <span>Edit</span>,
      enableSorting: false
    }),

  ] as Array<ColumnDef<LogInstance, any>>,[]);
  

  const [data, setData] = useState<LogInstance[]>([]);
  const [sortedData, setSortedData] = useState<LogInstance[] |any>([])
  const [sortMethod, setSortMethod] = useState("N")
  const [loading, setLoading] = useState(false);
  const [sortedByLive, setSortedByLive] = useState<LogInstance[]>()
  const [reverseSortedByLive, setReverseSortedByLive] = useState<LogInstance[]>()
  const [sortedByName, setSortedByName] = useState<LogInstance[]>()
  const [reverseSortedByName, setReverseSortedByName] = useState<LogInstance[]>()
  const [sortedByKiller, setSortedByKiller] = useState<LogInstance[]>()
  const [reverseSortedByKiller, setReverseSortedByKiller] = useState<LogInstance[]>()
  const [sortedByTime, setSortedByTime] = useState<LogInstance[]>()
  const [reverseSortedByTime, setReverseSortedByTime] = useState<LogInstance[]>()

  const [sorting, setSorting] = useState<SortingState>([])
  useEffect(() => {
      setLoading(true);
      fetchForData()
      const fetching = setInterval(fetchForData, 1000)
            return () => clearInterval(fetching);
      }, []);

  function fetchForData(){
   fetch(`http://${fetchURL}:8080/api/deaths`)
   .then(response => response.json())
   .then(data => {
    setData(data);
    setSortedByLive([...data].sort((a,b) => a.victimNewLives - b.victimNewLives))
    setReverseSortedByLive([...data].sort((a,b) => b.victimNewLives - a.victimNewLives))
    setSortedByName([...data].sort((a,b) => a.victimName.localeCompare(b.victimName)))
    setReverseSortedByName([...data].sort((a,b) => b.victimName.localeCompare(a.victimName)))
    setSortedByKiller([...data].sort((a,b) => a.killerName.localeCompare(b.killerName)))
    setReverseSortedByKiller([...data].sort((a,b) => b.killerName.localeCompare(a.killerName)))
    setSortedByTime([...data].sort((a,b) => a.timestamp - b.timestamp))
    setReverseSortedByTime([...data].sort((a,b) => b.timestamp - a.timestamp))
    
    setLoading(false)
    })
    
  }
  useEffect(() =>{
        if(sortMethod == "N"){
            setSortedData(reverseSortedByName);
        } else if (sortMethod == "RN"){
            setSortedData(sortedByName);
        }else if(sortMethod == "L"){
            setSortedData(reverseSortedByLive);

        } else if(sortMethod == "RL"){
            setSortedData(sortedByLive);
        } else if(sortMethod == "K"){
          setSortedData(reverseSortedByKiller);
        } else if(sortMethod == "RK"){
          setSortedData(sortedByKiller);
        } else if(sortMethod =="T"){
          setSortedData(reverseSortedByTime);
        } else if(sortMethod == "RT"){
          setSortedData(sortedByTime);
        }
    }, [sortMethod])

    function changeSortName(){
        if(sortMethod == "N"){
            setSortMethod("RN")
            
        } else{
            setSortMethod("N")
        }

    }
    function changeSortLive(){
        if(sortMethod == "L"){
            setSortMethod("RL")
        } else{
            setSortMethod("L")
        }
    }
    function changeSortKiller(){
      if(sortMethod == "K"){
        setSortMethod("RK")
      } else{
        setSortMethod("K")
      }
    }
    function changeSortTime(){
      if(sortMethod == "T"){
        setSortMethod("RT")
      } else{
        setSortMethod("T")
      }
    }

  const table = useReactTable<LogInstance>({
    columns, data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    sortDescFirst: true,
    isMultiSortEvent: () => true,
    enableMultiSort: true,
    onSortingChange: setSorting,
    state: {
      sorting,
    }
    })
  if (loading) {
      return <p>Loading...</p>
    }
    
  
  return (
    <>
      <Nav updateValue={undefined} />
      <div className="Log">
      
        <div className="Log-intro">
          <h2>Death List</h2>
            <table>
              <thead>
                {table.getHeaderGroups().map((headerGroup) =>(
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder ? null :(
                          <div
                            className={
                              header.column.getCanSort()
                                ? 'cursor-pointer select-none'
                                : ''
                            }
                            onClick={header.column.getToggleSortingHandler()}
                            title={
                              header.column.getCanSort()
                                ? header.column.getNextSortingOrder() === 'asc'
                                  ? 'Sort ascending'
                                  : header.column.getNextSortingOrder() === 'desc'
                                    ? 'Sort descending'
                                    : 'Clear sort'
                                : undefined
                            }
                          >
                          
                            {flexRender(header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: ' ^',
                            desc: ' v',
                          }[header.column.getIsSorted() as string] ?? null}
                          </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  )
                )}
              </thead>
              <tbody>
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                       <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, 
                          cell.getContext())}
                        </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          {/* {data.map(death =>
            <div key={death.id}>
              {death.victimName} | {death.killerName} | {death.timestamp} | {death.victimNewLives}
            </div>
          )} */}
        </div>
      
    </div>
    </>
  )
}

export default Log
async function handleDelete(id: Key): Promise<void> {
  try {
    // 1. Send DELETE request to your SQL back-end
    await fetch(`http://${fetchURL}:8080/api/deaths/delete/${id}`,
      {method: 'DELETE'}).then(response => {
        if (response.ok) {alert("Row deleted")}
      });
    
  } catch (error) {
    console.error("Error deleting record:", error);
    alert("Failed to delete");
  }
}

async function handlePatch(id: Key): Promise<void>{
  let message = prompt("What description would you like to add?")
  try {
    await fetch(`http://${fetchURL}:8080/api/deaths/patch/${id}`,
      {method: 'PATCH', 
      body: message
      }
    ).then(response => {
        if (response.ok) {alert("Description added")}
      });

  }catch (error) {
    console.error("Error patching record:", error);
    alert("Description failed to add");
  }
}


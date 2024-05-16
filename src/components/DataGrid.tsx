import React from "react"
import { Link } from "react-router-dom";
import * as types from "../types/index"
import * as enums from "../types/enums";

interface IGridHeader{
    key:string;
    label:string;
}

interface IProps{
    data:types.Task[];
    headers:IGridHeader[]
}

const DataGrid:React.FC<IProps> = ({data,headers}) => {
  return (
    
<div className="px-4  -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
               {headers.map(({key,label})=>{
                return(
                    <th
                    key={key}
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    {label}
                  </th>
                )
               })}
        <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  ></th>
                </tr>
              </thead>
              <tbody>
                { 
                 data&& data.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {item?.title}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <div className="flex flex-col gap-x-1.5 gap-y-1.5 flex-wrap">
                            <p className="text-gray-900 whitespace-no-wrap text-xs">
                              {item?.status}
                            </p>
                          </div>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          {item?.type === enums.Type.Question && (
                            <div className="flex items-center gap-x-1 ">
                              <span className="  rounded-full text-white text-xs font-semibold uppercase bg-zinc-400 px-2 py-1 ">
                                {item?.type}
                              </span>
                            </div>
                          )}
                          {item?.type === enums.Type.Bug && (
                            <div className="flex items-center gap-x-1  ">
                              <span className="  rounded-full text-white text-xs font-semibold uppercase bg-rose-500 px-6 py-1 ">
                                {item?.type}
                              </span>
                            </div>
                          )}
                          {item?.type === enums.Type.Feature&& (
                            <div className="flex items-center gap-x-1 ">
                              <span className="  rounded-full text-white text-xs font-semibold uppercase bg-purple-400 px-3 py-1 ">
                                {item?.type}
                              </span>
                            </div>
                          )}
                          {item?.type === enums.Type.Improvement&& (
                            <div className="flex items-center gap-x-1 ">
                              <span className="  rounded-full text-white text-xs font-semibold uppercase bg-pink-500 px-2 py-1 ">
                                {item?.type}
                              </span>
                            </div>
                          )}
                          {item?.type === enums.Type.Other && (
                            <div className="flex items-center gap-x-1 ">
                              <span className="  rounded-full text-white text-xs font-semibold uppercase bg-blue-400 px-4 py-1 ">
                                {item?.type}
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <div className="flex gap-x-1.5 gap-y-1.5 flex-wrap">
                            {new Date(item?.created).toLocaleDateString(
                              "en-US",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
                          <Link
                            to={`/ticket/${item.id}`}
                            className="text-green-600 hover:text-green-900"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>

          </div>
        </div>



  )
}

export default DataGrid
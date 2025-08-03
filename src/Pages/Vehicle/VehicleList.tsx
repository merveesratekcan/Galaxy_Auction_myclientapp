import React, { useEffect, useState } from 'react';
import { useGetVehiclesQuery } from '../../Api/vehicleApi';
import { vehicleModel } from '../../Interfaces/vehicleModel';
import './Styles/VehicleList.css';
import Circle from './Circle';
import { Link } from 'react-router-dom';
import Banner from './Banner';
import { SD_SORT } from '../../Interfaces/enums/SD_SORT';
import { useSelector } from 'react-redux';
import { RootState } from '../../Storage/store';

function VehicleList() {
    const { data, isLoading } = useGetVehiclesQuery(null);
    const [filterResponse, setFilterResponse] = useState<vehicleModel[]>([]);
    const [result, setResult] = useState<vehicleModel[]>([]);
    const [vehicles, setVehiclesState] = useState<vehicleModel[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [setSearch,setSearchState] = useState("");
    let searchElement : string = useSelector((state: RootState) => state.vehicleStore.search);

    const defaultPaginationArray:number[] =[]
    const PaginationArray:vehicleModel[] = [];
    const filterOptions : Array<SD_SORT> = [
        SD_SORT.PRICE_LOW_TO_HIGH,
        SD_SORT.PRICE_HIGH_TO_LOW,
        SD_SORT.NAME_A_TO_Z,
        SD_SORT.NAME_Z_TO_A,
        // SD_SORT.RemoveFilter,
        // SD_SORT.Pagination
    ];
    const extraOptions: Array<SD_SORT> = [
    SD_SORT.RemoveFilter,
    SD_SORT.Pagination
];

    const handleFilterClick = (sortTypes:any,index?:number) => {
      let forshortArray=[...result];
      if(filterOptions[sortTypes] === SD_SORT.PRICE_LOW_TO_HIGH) {
         forshortArray.sort((a, b) => { return b.price - a.price });
      }
         if(filterOptions[sortTypes] === SD_SORT.PRICE_HIGH_TO_LOW) {
            forshortArray.sort((a, b) => { return a.price - b.price });
        }
         if(filterOptions[sortTypes] === SD_SORT.NAME_A_TO_Z) {
            forshortArray.sort((a, b) => a.brandAndModel.toLowerCase().localeCompare(b.brandAndModel.toLowerCase()));
        }
         if(filterOptions[sortTypes] === SD_SORT.NAME_Z_TO_A) {
            forshortArray.sort((a, b) => b.brandAndModel.toLowerCase().localeCompare(a.brandAndModel.toLowerCase()));
        }

        localStorage.setItem('myFilter', JSON.stringify(forshortArray));
        if(filterOptions[sortTypes] === SD_SORT.RemoveFilter) {
            localStorage.removeItem('myFilter');
        }

       if (sortTypes === SD_SORT.Pagination) {
        setCurrentPage(index!);
        const pageSize = 6;
        const start = index! * pageSize;
        const end = start + pageSize;
        forshortArray = result.slice(start, end); 
    }
        setFilterResponse(forshortArray);
    };


    useEffect(() => {
        if (data) {
            setVehiclesState(data.result);
           setResult(data.result);
        }
    }, [data]);

    useEffect(() => {
    const myArray: vehicleModel[] = [];
    setSearchState(searchElement);

    if (vehicles && searchElement.trim() !== "") {
        vehicles.forEach((element) => {
            const response =
                element.brandAndModel.toLowerCase().includes(searchElement.toLowerCase()) ||
                element.color.toLowerCase().includes(searchElement.toLowerCase()) ||
                element.manufacturingYear.toString().includes(searchElement) ||
                element.price.toString().includes(searchElement);
            if (response) {
                myArray.push(element);
            }
        });
        setFilterResponse(myArray);
    } else if (data) {
        // Arama kutusu boşsa tüm ürünleri göster
        setFilterResponse(data.result.slice(currentPage * 6, currentPage * 6 + 6));
    }
}, [searchElement, vehicles, data, currentPage]);


   if (data){
             const ceilCalculation = Math.ceil(data?.result.length / 6);
                for (let index = 0; index < ceilCalculation; index++) {
                    defaultPaginationArray.push(index + 1);
                }
   }


    return (
        <div className="container">
            <Banner />
            <div className="row">
                <div className="dropdown mt-3 mb-3">
                    <button className='btn btn-secondary dropdown-toggle' type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Filter
                    </button>
                   <ul className="dropdown-menu">
                    {filterOptions.map((filterType, index) => (
                        <li key={index}>
                            <a className="dropdown-item" onClick={() => handleFilterClick(index)}>
                                {filterType}
                            </a>
                        </li>
                    ))}
                    <li>
                        <a className="dropdown-item" onClick={() => handleFilterClick(extraOptions.indexOf(SD_SORT.RemoveFilter) + filterOptions.length)}>
                            {SD_SORT.RemoveFilter}
                        </a>
                    </li>
                </ul>
                </div>
         
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    filterResponse.map((vehicle, index) => (
                        <div className="col" key={index}>
                            <div className="auction-card text-center">
                                <div className="card-image text-center">
                                    <img src={vehicle.image || 'https://via.placeholder.com/150'} alt={vehicle.brandAndModel} />
                                </div>
                                <div className="card-details text-center">
                                    <span className="badge">{vehicle.brandAndModel.split(' ')[0]}</span>
                                    <h2>{vehicle.brandAndModel}</h2>
                                    <p><strong>Year:</strong> {vehicle.manufacturingYear}</p>
                                    <p><strong>Color:</strong> {vehicle.color}</p>
                                    <p><strong>Current Bid:</strong> ${vehicle.price}</p>
                                    <p><strong>End Time:</strong> {vehicle.endTime}</p>
                                </div>
                                <div className="card-action text-center">
                                    <Link to={`Vehicle/VehicleId/${vehicle.vehicleId}`}>
                                        <button className="btn btn-danger">Detail</button>
                                    </Link>
                                </div>
                                <Circle vehicle={vehicle} />
                            </div>
                        </div>
                    ))
                )}
            </div>
            <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item"><a className="page-link" onClick={() => handleFilterClick("Pagination", currentPage - 1)}>Previous</a></li>
                {defaultPaginationArray.map((key, index) => (
                    <li className="page-item" >
                        <a className="page-link" key={index} onClick={() => handleFilterClick("Pagination", index)}>{key}</a>
                    </li>
                ))}
                <li className="page-item"><a className="page-link" onClick={() => handleFilterClick("Pagination", currentPage + 1)}>Next</a></li>
            </ul>
            </nav>
        </div>
    );
}

export default VehicleList;
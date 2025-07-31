// import React from 'react';
// import { vehicleModel } from '../../Interfaces/vehicleModel';
// import './Styles/VehicleList.css';
// import Circle from './Circle';
// import { Link } from 'react-router-dom';
// import Banner from './Banner';

// interface VehicleListProps {
//     vehicles: vehicleModel[];
// }

// const VehicleList: React.FC<VehicleListProps> = ({ vehicles }) => {
//     return (
//         <>
//             <Banner />
//             <div className="page-center">
//                 {vehicles.map((vehicle, index) => (
//                     <div key={index} className="auction-card text-center">
//                     <div className="card-image text-center">
//                         <img
//                             src={vehicle.image || 'https://via.placeholder.com/150'}
//                             alt={vehicle.brandAndModel}
//                         />
//                     </div>
//                     <div className="card-details text-center">
//                         <span className="badge">{vehicle.brandAndModel.split(' ')[0]}</span>
//                         <h2>{vehicle.brandAndModel}</h2>
//                         <p><strong>Year:</strong> {vehicle.manufacturingYear}</p>
//                         <p><strong>Color:</strong> {vehicle.color}</p>
//                         <p><strong>Current Bid:</strong> ${vehicle.price}</p>
//                         <p><strong>End Time:</strong> {vehicle.endTime}</p>
//                     </div>
//                     <div className="card-action text-center">
//                         <Link to={`Vehicle/VehicleId/${vehicle.vehicleId}`}>
//                             <button className="btn btn-danger">Detail</button>
//                         </Link>
//                     </div>
//                     <Circle vehicle={vehicle} />
//                 </div>
//                 ))}
//             </div>
//         </>
//     );
// };

// export default VehicleList;

import React, { useEffect, useState } from 'react';
import { useGetVehiclesQuery } from '../../Api/vehicleApi';
import { vehicleModel } from '../../Interfaces/vehicleModel';
import './Styles/VehicleList.css';
import Circle from './Circle';
import { Link } from 'react-router-dom';
import Banner from './Banner';
import { SD_SORT } from '../../Interfaces/enums/SD_SORT';

function VehicleList() {
    const { data, isLoading } = useGetVehiclesQuery(null);
    const [filterResponse, setFilterResponse] = useState<vehicleModel[]>([]);
    const [result, setResult] = useState<vehicleModel[]>([]);

    const filterOptions : Array<SD_SORT> = [
        SD_SORT.PRICE_LOW_TO_HIGH,
        SD_SORT.PRICE_HIGH_TO_LOW,
        SD_SORT.NAME_A_TO_Z,
        SD_SORT.NAME_Z_TO_A,
    ];

    const handleFilterClick = (sortTypes:any) => {
      
    };

    useEffect(() => {
        if (data) {
           setResult(data.result);
        }
    }, [data]);

    return (
        <div className="container">
            <Banner />
            <div className="row">
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    result.map((vehicle, index) => (
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
        </div>
    );
}

export default VehicleList;
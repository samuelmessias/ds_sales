import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import Filter from './components/filter';
import Header from './components/header';
import PieChartCard from './components/pie-chart-data';
import SalesByDate from './components/sale-by-date';
import SalesSummary from './components/sales-summary';
import SalesTable from './components/sales-table';
import { buildSalesByPaymentMethod, buildSalesByStoreChart } from './helpers';
import { FilterData, Gender, PieChartConfig, SalesByPaymentMethod, SalesByStore } from './types';
import { buildFilterParams, makeRequest } from './util/request';

function App() {
  const [filterData, setFilterData] = useState<FilterData>();

  const [salesByStore, setSalesByStore] = useState<PieChartConfig>();

  const [salesByPaymentMethod, setSalesByPaymentMethod] = useState<PieChartConfig>();

  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  useEffect(() => {
    makeRequest
      .get<SalesByStore[]>('/sales/by-store', { params })
      .then((response) => {
        const newSalesByStore = buildSalesByStoreChart(response.data);
        setSalesByStore(newSalesByStore);
      })
      .catch(() => {
        console.log('Error to fetch sales by date');
      });
  }, [params]);

  useEffect(() => {
    makeRequest
      .get<SalesByPaymentMethod[]>('/sales/by-payment-method', { params })
      .then((response) => {
        const newSalesByPaymentMethod = buildSalesByPaymentMethod(response.data);
        setSalesByPaymentMethod(newSalesByPaymentMethod);
      })
      .catch(() => {
        console.log('Error to fetch sales by date');
      });
  }, [params]);

  const onFilterChange = (filter: FilterData) => {
    setFilterData(filter);
  };
  return (
    <div className="App">
      <>
        <Header />
        <div className="app-container">
          <Filter onFilterChange={onFilterChange} />
          <SalesByDate filterData={filterData} />
          <div className="sales-overview-container">
            <SalesSummary filterData={filterData} />
            <PieChartCard
              name="Lojas"
              labels={salesByStore?.labels}
              series={salesByStore?.series}
            />
            <PieChartCard
              name="Pagamentos"
              labels={salesByPaymentMethod?.labels}
              series={salesByPaymentMethod?.series}
            />
          </div>
          <SalesTable filterData={filterData} />
        </div>
      </>
    </div>
  );
}

export default App;

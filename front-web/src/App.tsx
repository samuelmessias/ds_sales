import React from 'react';
import './App.css';
import Filter from './components/filter';
import Header from './components/header';
import PieChartCard from './components/pie-chart-data';
import SalesByDate from './components/sale-by-date';
import SalesSummary from './components/sales-summary';
import SalesTable from './components/sales-table';

function App() {
  return (
    <div className="App">
      <>
        <Header />
        <div className="app-container">
          <Filter />
          <SalesByDate />
          <div className="sales-overview-container">
            <SalesSummary />
            <PieChartCard
              name="Lojas"
              labels={['UberLaândia', 'Araguari', 'Uberaba']}
              series={[40, 30, 30]}
            />
            <PieChartCard
              name="Pagamentos"
              labels={['Crédito', 'Débito', 'Dinheiro']}
              series={[40, 30, 30]}
            />
          </div>
          <SalesTable />
        </div>
      </>
    </div>
  );
}

export default App;

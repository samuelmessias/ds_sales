import SalesSummaryCard from './sales-summary-card';
import './styles.css';

import { ReactComponent as AvatarIcon } from '../../assets/avatar-icon.svg';
import { ReactComponent as BarIcon } from '../../assets/bar-chart.svg';
import { ReactComponent as DoneIcon } from '../../assets/done-icon.svg';
import { ReactComponent as SycnIcon } from '../../assets/sycn-icon.svg';
import { FilterData, SalesSummaryData } from '../../types';
import { useEffect, useMemo, useState } from 'react';
import { buildFilterParams, makeRequest } from '../../util/request';

type Props = {
  filterData?: FilterData;
};

const initialSummary = {
  min: 0,
  max: 0,
  avg: 0,
  count: 0
};

function SalesSummary({ filterData }: Props) {
  const [summary, setSummary] = useState<SalesSummaryData>(initialSummary);
  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  useEffect(() => {
    makeRequest
      .get<SalesSummaryData>('/sales/summary', { params })
      .then((response) => {
        setSummary(response.data);
      })
      .catch(() => {
        console.log('Error to fetch sales by date');
      });
  }, [params]);

  return (
    <div className="sales-summary-container">
      <SalesSummaryCard value={summary?.avg?.toFixed(2)} label="Média" icon={<DoneIcon />} />
      <SalesSummaryCard value={summary?.count} label="Quantidade" icon={<SycnIcon />} />
      <SalesSummaryCard value={summary?.min} label="Mínina" icon={<BarIcon />} />
      <SalesSummaryCard value={summary?.max} label="Máxima" icon={<AvatarIcon />} />
    </div>
  );
}

export default SalesSummary;

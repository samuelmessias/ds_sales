import SalesSummaryCard from './sales-summary-card';
import './styles.css';

import { ReactComponent as AvatarIcon } from '../../assets/avatar-icon.svg';
import { ReactComponent as BarIcon } from '../../assets/bar-chart.svg';
import { ReactComponent as DoneIcon } from '../../assets/done-icon.svg';
import { ReactComponent as SycnIcon } from '../../assets/sycn-icon.svg';

function SalesSummary() {
  return (
    <div className="sales-summary-container">
      <SalesSummaryCard value={430} label="Média" icon={<DoneIcon />} />
      <SalesSummaryCard value={630} label="Quantidade" icon={<SycnIcon />} />
      <SalesSummaryCard value={130} label="Mínina" icon={<BarIcon />} />
      <SalesSummaryCard value={230} label="Máxima" icon={<AvatarIcon />} />
    </div>
  );
}

export default SalesSummary;

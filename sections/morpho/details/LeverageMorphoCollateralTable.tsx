import Table from '@components/Table';
import TableHeader from '@components/Table/TableHead';
import TableBody from '@components/Table/TableBody';
import TableRowEmpty from '@components/Table/TableRowEmpty';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/redux.store';
import { LeverageMorphoCollateralFlatRaw, LeverageMorphoInstance } from '../../../redux/slices/morpho.scale.types';
import LeverageMorphoCollateralRow from './LeverageMorphoCollateralRow';

interface Props {
	instance: LeverageMorphoInstance;
}

export default function LeverageMorphoCollateralTable({ instance }: Props) {
	const headers: string[] = ['Date', 'Kind', 'Oracle', 'Value', 'Amount'];
	const [tab, setTab] = useState<string>(headers[0]);
	const [reverse, setReverse] = useState<boolean>(false);
	const [list, setList] = useState<LeverageMorphoCollateralFlatRaw[]>([]);

	const { morphoScale } = useSelector((state: RootState) => state);
	const collateral = morphoScale.collateral.filter((i) => i.address.toLowerCase() == instance.address.toLowerCase());

	const sorted = collateral;

	useEffect(() => {
		const idList = list.map((l) => l.id).join('_');
		const idSorted = sorted.map((l) => l.id).join('_');
		if (idList != idSorted) setList(sorted);
	}, [list, sorted]);

	const handleTabOnChange = function (e: string) {
		if (tab === e) {
			setReverse(!reverse);
		} else {
			setReverse(false);
			setTab(e);
		}
	};

	return (
		<Table>
			<TableHeader headers={headers} tab={tab} reverse={reverse} tabOnChange={handleTabOnChange} />
			<TableBody>
				{sorted.length == 0 ? (
					<TableRowEmpty>{'There are no collateral adjustments yet.'}</TableRowEmpty>
				) : (
					sorted.map((i, idx) => (
						<LeverageMorphoCollateralRow
							headers={headers}
							tab={tab}
							key={`LeverageMorphoCollateralRow_${i.id}`}
							instance={instance}
							entry={i}
						/>
					))
				)}
			</TableBody>
		</Table>
	);
}

import Table from '@components/Table';
import TableHeader from '@components/Table/TableHead';
import TableBody from '@components/Table/TableBody';
import TableRowEmpty from '@components/Table/TableRowEmpty';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/redux.store';
import { LeverageMorphoExecuteFlatRaw, LeverageMorphoInstance, LeverageMorphoLoanFlatRaw } from '../../../redux/slices/morpho.scale.types';
import LeverageMorphoLoanRow from './LeverageMorphoLoanRow';
import LeverageMorphoExecuteRow from './LeverageMorphoExecuteRow';

interface Props {
	instance: LeverageMorphoInstance;
}

export default function LeverageMorphoExecuteTable({ instance }: Props) {
	const headers: string[] = ['Kind', 'Supply', 'Swap', 'Price'];
	const [tab, setTab] = useState<string>(headers[3]);
	const [reverse, setReverse] = useState<boolean>(false);
	const [list, setList] = useState<LeverageMorphoExecuteFlatRaw[]>([]);

	const { morphoScale } = useSelector((state: RootState) => state);
	const execute = morphoScale.execute.filter((i) => i.address.toLowerCase() == instance.address.toLowerCase());

	const sorted = execute;

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
					<TableRowEmpty>{'There are no loan adjustments yet.'}</TableRowEmpty>
				) : (
					sorted.map((i, idx) => (
						<LeverageMorphoExecuteRow
							headers={headers}
							tab={tab}
							key={`LeverageMorphoExecuteRow_${i.id}`}
							instance={instance}
							entry={i}
						/>
					))
				)}
			</TableBody>
		</Table>
	);
}

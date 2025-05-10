import NavElement from './NavElement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowRightArrowLeft,
	faArrowUpShortWide,
	faBank,
	faGavel,
	faBuilding,
	faCampground,
	faCoins,
	faCommentDollar,
	faMoneyBills,
	faComputer,
	faDatabase,
	faFileInvoice,
	faFingerprint,
	faHandHoldingHeart,
	faHandshake,
	faHandsHoldingCircle,
	faHouse,
	faLaptopCode,
	faLightbulb,
	faMoneyBill1Wave,
	faPeopleGroup,
	faPiggyBank,
	faRankingStar,
	faScrewdriverWrench,
	faSeedling,
	faServer,
	faSliders,
	faUnlockKeyhole,
	faVault,
	faBook,
	faArrowsUpToLine,
} from '@fortawesome/free-solid-svg-icons';
import { SetStateAction } from 'react';

export type NavBarTree = {
	title: string;
	items: (NavBarElement | NavBarElements)[];
};

export type NavBarElement = {
	name: string;
	to: string;
	external?: boolean;
	icon?: JSX.Element;
};

export type NavBarElements = {
	name: string;
	icon: JSX.Element;
	childs: NavBarElement[];
};

export const NavTree: NavBarTree[] = [
	{
		title: 'Overview',
		items: [
			{
				name: 'Dashboard',
				to: '/home/purpose',
				icon: <FontAwesomeIcon icon={faFingerprint} className="cursor-pointer" />,
			},
			{
				name: 'Vault',
				to: '/finance/vault',
				icon: <FontAwesomeIcon icon={faVault} className="cursor-pointer" />,
			},
			{
				name: 'Docs',
				to: '/docs',
				icon: <FontAwesomeIcon icon={faBook} className="cursor-pointer" />,
			},
		],
	},
	{
		title: 'Management',
		items: [
			{
				name: 'Governance',
				icon: <FontAwesomeIcon icon={faPeopleGroup} className="cursor-pointer" />,
				childs: [
					{
						name: 'List',
						to: '/governance/list',
					},
					{
						name: 'Details',
						to: '/governance/details',
					},
					{
						name: 'Create',
						to: '/governance/create',
					},
					{
						name: 'Edit',
						to: '/governance/edit',
					},
				],
			},
			{
				name: 'Environment',
				icon: <FontAwesomeIcon icon={faServer} className="cursor-pointer" />,
				childs: [
					{
						name: 'List',
						to: '/environment/list',
					},
					{
						name: 'Details',
						to: '/environment/details',
					},
					{
						name: 'Create',
						to: '/environment/create',
					},
					{
						name: 'Edit',
						to: '/environment/edit',
					},
				],
			},
			{
				name: 'Morpho: Scale',
				icon: <FontAwesomeIcon icon={faArrowsUpToLine} className="cursor-pointer" />,
				childs: [
					{
						name: 'List',
						to: '/morpho/scale/list',
					},
					{
						name: 'Create',
						to: '/morpho/scale/create',
					},
				],
			},
			{
				name: 'Vault',
				icon: <FontAwesomeIcon icon={faVault} className="cursor-pointer" />,
				childs: [
					{
						name: 'List',
						to: '/vault/list',
					},
					{
						name: 'Details',
						to: '/vault/details',
					},
					{
						name: 'Create',
						to: '/vault/create',
					},
					{
						name: 'Edit',
						to: '/vault/edit',
					},
				],
			},
			{
				name: 'Savings',
				icon: <FontAwesomeIcon icon={faPiggyBank} className="cursor-pointer" />,
				childs: [
					{
						name: 'List',
						to: '/savings/list',
					},
					{
						name: 'Details',
						to: '/savings/details',
					},
					{
						name: 'Create',
						to: '/savings/create',
					},
					{
						name: 'Edit',
						to: '/savings/edit',
					},
				],
			},
			{
				name: 'Invoice',
				icon: <FontAwesomeIcon icon={faFileInvoice} className="cursor-pointer" />,
				childs: [
					{
						name: 'List',
						to: '/invoice/list',
					},
					{
						name: 'Details',
						to: '/invoice/details',
					},
					{
						name: 'Create',
						to: '/invoice/create',
					},
					{
						name: 'Edit',
						to: '/invoice/edit',
					},
				],
			},
		],
	},
];

export type NavElementTreeProps = {
	tree?: NavBarTree[];
	setIsNavBarOpen: (value: SetStateAction<boolean>) => void;
};

export default function NavElementTree({ tree, setIsNavBarOpen }: NavElementTreeProps) {
	if (tree == undefined) tree = NavTree;
	if (tree.length == 0) return null;

	return (
		<>
			{tree.map((root) => (
				<div className="px-2" key={root.title}>
					<div className="pl-2 text-sm font-semibold">{root.title.toUpperCase()}</div>

					<li className="flex flex-col">
						{root.items.map((item) => (
							<NavElement item={item} key={item.name} setIsNavBarOpen={setIsNavBarOpen} />
						))}
					</li>
				</div>
			))}
		</>
	);
}

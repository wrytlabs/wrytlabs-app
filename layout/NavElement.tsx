'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavBarElement, NavBarElements } from './NavElementTree';
import { SetStateAction, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight, faCircle } from '@fortawesome/free-solid-svg-icons';

export type NavElementProps = {
	item: NavBarElement | NavBarElements;
	setIsNavBarOpen: (value: SetStateAction<boolean>) => void;
};

export default function NavElement({ item, setIsNavBarOpen }: NavElementProps) {
	const [showChilds, setShowChilds] = useState<boolean>(true);
	const pathname = usePathname();
	const isElement = Object.keys(item).includes('to');

	if (isElement) {
		const element = item as NavBarElement;
		return (
			<div className="py-1">
				<Link
					className={`btn btn-nav`}
					href={element.to}
					target={element.external ? '_blank' : '_self'}
					onClick={() => setIsNavBarOpen(false)}
				>
					<div
						className={`flex flex-row items-center pl-4 py-2 gap-4 rounded-2xl ${
							pathname.includes(element.to) ? 'bg-menu-active/20 text-menu-textactive' : 'hover:bg-menu-hover text-menu-text'
						}`}
					>
						<div className="w-[2rem] flex items-center justify-center">{element.icon}</div>
						<div className="">{element.name}</div>
					</div>
				</Link>
			</div>
		);
	}

	if (!isElement) {
		const elements = item as NavBarElements;
		const childs = elements.childs;
		return (
			<div className="py-1" onClick={() => setShowChilds(!showChilds)}>
				<div
					className={`flex flex-row items-center pl-4 py-2 gap-4 rounded-2xl cursor-pointer ${
						showChilds ? 'bg-menu-active/5' : 'hover:bg-menu-hover text-menu-text'
					}`}
				>
					<div className="w-[2rem] flex items-center justify-center">{elements.icon}</div>
					<div className="">{elements.name}</div>
					<div className="flex justify-end ml-auto pr-4">
						<FontAwesomeIcon icon={showChilds ? faAngleDown : faAngleRight} className="cursor-pointer" />
					</div>
				</div>

				<div className="py-1">
					{showChilds &&
						childs.map((c) => (
							<div className="py-1" key={elements.name + c.name}>
								<Link
									className={`btn btn-nav`}
									href={c.to}
									target={c.external ? '_blank' : '_self'}
									onClick={() => setIsNavBarOpen(false)}
								>
									<div
										className={`flex flex-row items-center pl-4 py-2 gap-4 rounded-2xl ${
											pathname.includes(c.to)
												? 'bg-menu-active/20 text-menu-textactive'
												: 'hover:bg-menu-hover text-menu-text'
										}`}
									>
										<div className="w-[2rem] flex items-center justify-center">
											<FontAwesomeIcon icon={faCircle} className="cursor-pointer" width={6} />
										</div>
										<div className="">{c.name}</div>
									</div>
								</Link>
							</div>
						))}
				</div>
			</div>
		);
	}
}

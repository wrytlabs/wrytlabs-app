'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavBarTree } from './NavElementTree';

export type NavElementProps = {
	item: NavBarTree;
	external?: boolean;
};

export default function NavElement({ item, external }: NavElementProps) {
	const pathname = usePathname();
	// const active = item.to ? pathname.includes(item.to) : false;
	const active = item.to === pathname;
	const childs = item.childs || [];
	return (
		<div className="rounded-2xl p-3 shadow-lg bg-card-body-primary/70">
			<Link className={`btn btn-nav hover:text-menu-hover`} href={item.to ?? ''} target={external ? '_blank' : '_self'}>
				<div className="flex flex-row items-center">
					<div className="mx-5 w-[2rem] flex items-center justify-center">{item.icon}</div>
					<span className={active ? 'text-menu-active font-semibold' : 'font-semibold'}>{item.name}</span>
				</div>
			</Link>

			{childs.length > 0 ? (
				<>
					<div className="mt-2 h-[2px] rounded bg-layout-secondary"></div>

					<div className="flex flex-col mt-5 gap-2">
						{childs.length > 0
							? childs.map((c) => (
									<Link
										className={`btn btn-nav hover:text-menu-hover`}
										key={item.name + c.name}
										href={c.to ?? ''}
										target={external ? '_blank' : '_self'}
									>
										<div className="flex">
											<div className="mx-5 w-[2rem] flex items-center justify-center">{c.icon}</div>
											<div className={c.to && pathname.includes(c.to) ? 'font-semibold' : ''}>{c.name}</div>
										</div>
									</Link>
							  ))
							: null}
					</div>
				</>
			) : (
				<></>
			)}
		</div>
	);
}

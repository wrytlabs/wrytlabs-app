'use client';

import AppCard from '@components/AppCard';
import AppFileUpload from '@components/Input/FileUpload';

export default function TestingPage() {
	return (
		<div className="grid md:grid-cols-2">
			<AppCard>
				<AppFileUpload label="Upload PDF File" onError={() => console.log('Done')} onSuccess={() => console.log('Yuhuuu')} />
			</AppCard>
		</div>
	);
}

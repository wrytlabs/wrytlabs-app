import { useRef, useState } from 'react';
import { API_CLIENT } from '../../app.config';
import { getAccessToken } from '@utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';

export interface AppFileUploadProps {
	label?: string;
	note?: string;
	apiUrl?: string;
	onChange?: (value: File | null) => void;
	onError?: (errorMessage: string) => void;
	onSuccess?: () => void;
	disabled?: boolean;
}

export default function AppFileUpload({
	label = 'Upload File',
	note,
	apiUrl,
	onChange = () => {},
	onError = console.error,
	onSuccess,
	disabled,
}: AppFileUploadProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [file, setFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);
	const [successful, setSuccessful] = useState(false);
	const [progress, setProgress] = useState(0);
	const [error, setError] = useState('');

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.[0]) {
			setFile(e.target.files[0]);
			setSuccessful(false);
			onChange(e.target.files[0]);
		}
	};

	const handleFileSelect = () => {
		inputRef.current?.click();
	};

	const handleFileUpload = async () => {
		try {
			if (!file || uploading) return;
			setUploading(true);
			setSuccessful(false);

			const formData = new FormData();
			formData.append('file', file);

			const response = await API_CLIENT({
				url: apiUrl ?? '/file/validation',
				method: 'POST',
				data: formData,
				headers: {
					Authorization: `Bearer ${getAccessToken()}`,
				},
				onUploadProgress(progressEvent) {
					let { loaded, total } = progressEvent;
					if (total) setProgress(Math.round((loaded / total) * 100));
				},
			});

			if (response.status === 200 || response.status === 201) {
				setError('');
				setSuccessful(true);
				onSuccess?.();
			}
		} catch (e: any) {
			if (e.response && e.response.status === 400) {
				const errorData = e.response.data;
				errorData.errors.forEach((error: string, index: number) => {
					console.error(`${index + 1}. ${error}`);
				});
			} else {
				setError('An unknown error occurred. Please try again later');
			}
			onError?.(e.toString());
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="-mb-4">
			<div
				className={`group border-card-input-border ${
					disabled ? '' : 'hover:border-card-input-hover'
				} focus-within:!border-card-input-focus ${
					error ? '!border-card-input-error' : ''
				} text-text-secondary border-2 rounded-lg px-3 py-1 ${disabled ? 'bg-card-input-disabled' : ''}`}
				onClick={handleFileSelect}
			>
				<div className="flex text-card-input-label my-1">{label}</div>

				<div className="flex items-center">
					<div
						className={`flex-1 py-2 ${
							error ? 'text-card-input-error' : !!file?.name ? 'text-text-primary' : 'placeholder:text-card-input-empty'
						}`}
					>
						<div className={`text-xl py-0 bg-transparent lg:w-[20rem] max-lg:w-[16rem] max-sm:w-[14rem] truncate`}>
							{file?.name ?? 'No file selected...'}
						</div>
					</div>

					<input ref={inputRef} className="hidden" type="file" onChange={handleFileChange} />

					<div
						className=""
						onClick={(e) => {
							e.stopPropagation();
							handleFileUpload();
						}}
					>
						<FontAwesomeIcon
							className={`${
								disabled || successful || file == null || file == undefined
									? 'cursor-not-allowed'
									: 'hover:text-button-hover cursor-pointer text-button-default'
							}`}
							icon={faCloudArrowUp}
							width={64}
							height={64}
							style={{ width: '64px', height: '32px' }}
						/>
					</div>
				</div>

				<div className="flex flex-row gap-2 py-1 " onClick={(e) => e.stopPropagation()}>
					<div className="flex-1 min-w-0">
						{uploading && (
							<div className="flex flex-row gap-2 w-full">
								<div className="text-text-secondary flex-shrink-0">Uploading</div>
								<div className="text-text-primary truncate min-w-0 overflow-hidden">{progress}%</div>
							</div>
						)}
						{successful && (
							<div className="flex flex-row gap-2 w-full">
								<div className="text-text-secondary flex-shrink-0">Successfully updated</div>
							</div>
						)}
					</div>
				</div>
			</div>

			{error ? <div className="flex my-2 px-3.5 text-text-warning">{error}</div> : <div className="flex my-2 px-3.5">{note}</div>}
		</div>
	);
}

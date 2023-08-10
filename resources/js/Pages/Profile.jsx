import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';

export default Profile = ({auth}) => {

	return (
		<AuthenticatedLayout />
			<Head title="Profile" />
			<div>
				<div
					id="TopNavUser"
					className="md:hidden fixed flex items-center justify-between z-30 w-full bg-white h-[61px] border-b border-b-gray-300"
				>
					<Link href="/dashboard" className="px-4">
						<ChevronLeftRoundedIcon size={30} className="cursor-pointer" />
					</Link>
					<div className="font-extrabold text-lg">
						{user.name}
					</div>
					<PersonAddRoundedIcon
						size={30}
						className="cursor-pointer px-4"
					/>
				</div>
				{auth.user}
			</div>
		</AuthenticatedLayout>
	)
}
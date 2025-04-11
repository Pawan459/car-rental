'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
	Button,
	Calendar,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const formSchema = z
	.object({
		startDate: z.date({
			required_error: 'Please select a pickup date',
		}),
		endDate: z.date({
			required_error: 'Please select a return date',
		}),
	})
	.refine((data) => data.endDate > data.startDate, {
		message: 'Return date must be after pickup date',
		path: ['endDate'],
	});

export const SearchForm = () => {
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		router.replace(
			`?start=${values.startDate.toISOString()}&end=${values.endDate.toISOString()}`,
			{ scroll: false }
		);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 max-w-md mx-auto"
			>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name="startDate"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Pickup Date</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={'outline'}
												className={cn(
													'w-full pl-3 text-left font-normal',
													!field.value && 'text-muted-foreground'
												)}
											>
												{field.value ? (
													format(field.value, 'PPP')
												) : (
													<span>Select pickup date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) => date < new Date()}
											className={cn('p-3')}
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="endDate"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Return Date</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={'outline'}
												className={cn(
													'w-full pl-3 text-left font-normal',
													!field.value && 'text-muted-foreground'
												)}
											>
												{field.value ? (
													format(field.value, 'PPP')
												) : (
													<span>Select return date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) =>
												date < (form.getValues().startDate || new Date())
											}
											className={cn('p-3')}
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button
					type="submit"
					className="w-full bg-blue-600 hover:bg-blue-700 text-white"
					size="lg"
				>
					Search Available Cars
				</Button>
			</form>
		</Form>
	);
};

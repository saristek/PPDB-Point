<script lang="ts">
	import type { PageData } from './$types';
	import Modal from '$lib/components/Modal.svelte';

	// would be render on both server-client
	export let data: PageData;

	let detail: any;
	let showModal = false;
</script>

<main class="flex-1 flex flex-col">
	<div class="w-full border-b bg-white shadow-xs z-40 delay-500 sticky top-0 py-2">
		<div class="mx-auto container flex justify-end md:justify-start gap-2">
			<a href="?jalur=afirmasi">
				<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>Afirmasi</button
				>
			</a>
			<a href="?jalur=prestasi">
				<button class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
					>Prestasi</button
				>
			</a>
		</div>
	</div>
	<div class="flex-1 mx-auto container">
		{#await data.jalur}
			<p>memuat...</p>
		{:then hasil}
			<div class="flex justify-between p-2">
				<h1>mode: {data.mode}</h1>
				<h1>terdata: {hasil.jml_pagu}</h1>
			</div>
			<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead
						class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
					>
						<tr>
							<th scope="col" class="px-6 py-3"> No </th>
							<th scope="col" class="px-6 py-3"> No Daftar </th>
							<th scope="col" class="px-6 py-3"> Nama </th>
							{#if data.mode == 'prestasi'}
								<th scope="col" class="px-6 py-3"> Nilai Akhir </th>
							{:else}
								<th scope="col" class="px-6 py-3"> Zona </th>
							{/if}
							<th scope="col" class="px-6 py-3"> Detail </th>
						</tr>
					</thead>
					<tbody>
						{#each hasil.data as anak, index}
							<tr
								class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
							>
								<th
									scope="row"
									class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>{index + 1}</th
								>
								<td class="px-6 py-4">{anak[2]}</td>
								<td class="px-6 py-4">{anak[3]}</td>
								<td class="px-6 py-4">{anak[4]}</td>
								<td class="px-6 py-4">
									<!-- svelte-ignore a11y-invalid-attribute -->
									<button
										on:click={() => {
											detail = anak;
											showModal = true;
										}}
										class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
										>Lihat</button
									>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{:catch error}
			<p>{error.message}</p>
		{/await}
	</div>
</main>
<footer class="flex p-4 justify-center font-bold">
	<h2>build by @saristek</h2>
</footer>

{#if detail}
	<Modal bind:showModal>
		<h3 slot="header" class="text-xl font-semibold text-gray-900 dark:text-white">
			Detail Informasi
		</h3>
		<div class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			<table class="w-full">
				<tbody>
					<tr>
						<td>Nama</td>
						<td> : </td>
						<td>{detail[3]}</td>
					</tr>
					<tr>
						<td>No Daftar</td>
						<td> : </td>
						<td>{detail[2]}</td>
					</tr>
					<tr>
						<td>Zona</td>
						<td> : </td>
						<td>{detail[4]}</td>
					</tr>
					<tr>
						<td>Usia</td>
						<td> : </td>
						<td>{detail[5]}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</Modal>
{/if}

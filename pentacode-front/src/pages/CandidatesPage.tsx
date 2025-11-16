import { useState } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import CandidateGrid from '../components/CandidateGrid';
import { mockCandidates } from '../data/mockCandidates';

export default function CandidatesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(mockCandidates.length / 9);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <FilterSidebar />
        <CandidateGrid
          candidates={mockCandidates}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </main>
  );
}

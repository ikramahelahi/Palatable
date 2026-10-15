export const CANDIDATE_PEOPLE = [
  { name: 'Amira Hassan', initials: 'AH' },
  { name: 'Bilal Malik', initials: 'BM' },
  { name: 'Noor Qadir', initials: 'NQ' },
  { name: 'Hana Youssef', initials: 'HY' },
  { name: 'Tariq Osman', initials: 'TO' },
  { name: 'Layla Benali', initials: 'LB' },
  { name: 'Yusuf Chowdhury', initials: 'YC' },
  { name: 'Dina El-Amin', initials: 'DE' },
  { name: 'Rami Khoury', initials: 'RK' },
  { name: 'Fatima Aziz', initials: 'FA' },
  { name: 'Omar Farooq', initials: 'OF' },
  { name: 'Sara Ahmed', initials: 'SA' },
].map((person) => ({ id: person.name.toLowerCase().replace(/[^a-z]+/g, '-'), ...person }))

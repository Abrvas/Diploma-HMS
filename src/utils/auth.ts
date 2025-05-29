// auth.ts
export async function login(email: string, password: string) {
  const res = await fetch('http://localhost:8000/api/doctor/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    throw new Error('Invalid credentials');
  }

  const data = await res.json();

  localStorage.setItem('access', data.access);
  localStorage.setItem('refresh', data.refresh);
  localStorage.setItem('doctor_id', data.doctor_id);
  localStorage.setItem('name', data.name);
  localStorage.setItem('role', data.role);

  return data;
}

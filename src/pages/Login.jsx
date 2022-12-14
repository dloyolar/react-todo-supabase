import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/client';

export const Login = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await supabase.auth.signInWithOtp({ email });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        navigate('/');
      }
    }
    getUser();
  }, [navigate]);

  return (
    <div className="row pt-4">
      <div className="col-md-4 offset-md-4">
        <form onSubmit={handleSubmit} className="card card-body">
          <input
            type="email"
            name="email"
            placeholder="youremail@site.com"
            onChange={(e) => setEmail(e.target.value)}
            className="form-control mb-2"
          />
          <button className="btn btn-primary">Send</button>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { RegisterTitle, RegisterSubtitle } from 'features/register/styles';
import { Button, Input } from 'components/ui';
import { Stack } from 'components/system';

const RegisterPage = () => {
  const [filter, setFilter] = useState({
    firstName: '',
    lastName: '',
    company: '',
    role: '',
    email: '',
    password: '',
  });

  return (
    <Stack>
      <RegisterTitle>Sign Up as Company</RegisterTitle>
      <RegisterSubtitle>
        Reach the most relevant market possible by connecting with influencers
        who have pre-established trust with your target audience.
      </RegisterSubtitle>
      <Stack direction="horizontal">
        <Input
          type="text"
          label="First Name"
          required
          placeholder="Please enter first name"
          value={filter.firstName}
          onValue={(firstName) => setFilter({ ...filter, firstName })}
        />
        <Input
          type="text"
          label="Last Name"
          required
          placeholder="Please enter last name"
          value={filter.lastName}
          onValue={(lastName) => setFilter({ ...filter, lastName })}
        />
      </Stack>
      <Stack direction="horizontal">
        <Input
          type="text"
          label="Company"
          required
          placeholder="Please enter your company"
          value={filter.company}
          onValue={(company) => setFilter({ ...filter, company })}
        />
        <Input
          type="text"
          label="Role"
          required
          placeholder="Please enter your role"
          value={filter.role}
          onValue={(role) => setFilter({ ...filter, role })}
        />
      </Stack>
      <Input
        type="text"
        label="Email"
        required
        placeholder="Please enter your email"
        value={filter.email}
        onValue={(email) => setFilter({ ...filter, email })}
      />
      <Input
        type="text"
        label="Password"
        required
        placeholder="Please enter your password"
        value={filter.password}
        onValue={(password) => setFilter({ ...filter, password })}
      />
      <Button variant="contained" size="large" color="secondary">
        SIGN UP NOW
      </Button>
    </Stack>
  );
};

export default RegisterPage;
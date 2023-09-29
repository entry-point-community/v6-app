<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <!-- <a href="https://github.com/entry-point-community/v6-app">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

<h1 align="center">V6 App</h1>

  <p align="center">
    A fullstack, multi-app, monorepo dedicated to streamline your development process and satisfy all your needs ;)
    <br />
    <!-- <a href="https://github.com/entry-point-community/v6-app"><strong>Explore the docs »</strong></a>
    <br /> -->
    <br />
    <a href="https://github.com/entry-point-community/v6-app/issues">Report Bug</a>
    ·
    <a href="https://github.com/entry-point-community/v6-app/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<h4>Table of Contents</h4>
<ol>
  <li>
    <a href="#about-the-project">About The Project</a>
    <ul>
      <li><a href="#built-with">Built With</a></li>
    </ul>
  </li>
  <li>
    <a href="#getting-started">Getting Started</a>
    <ul>
      <li><a href="#prerequisites">Prerequisites</a></li>
      <li><a href="#installation">Installation</a></li>
    </ul>
  </li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#roadmap">Roadmap</a></li>
  <li><a href="#contributing">Contributing</a></li>
  <li><a href="#license">License</a></li>
  <li><a href="#contact">Contact</a></li>
  <li><a href="#acknowledgments">Acknowledgments</a></li>
</ol>

<!-- ABOUT THE PROJECT -->

## About The Project

### It's basically JUST A MONOREPO.

This project was built based on my needs in my software development experience. Most often, real world software projects require multiple apps to be built. Say, if you're building a web application such as an e-commerce, chances are you would need to also build an admin/back office system, and these applications are likely to be connected to an API. So why not bundle them all up in a monorepo, while creating reusable packages to make development changes faster and easier?

### I only made a template for you. Make any changes you want.

The default template features a NextJS and NestJS app. The `package` folder will contain code that should be reusable across apps. My personal favorite is the `api` package which bundles and exports **react-query** queries and mutations to be used across multiple frontend apps (assuming you're using React). Write queries and mutations once, import, and use them in your frontend apps. No more broken API requests because you forgot to implement a few params changes.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- pnpm
- Turborepo
- NextJS
- NestJS
- Prisma
- Supabase

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# ⚠️Sections below are under construction⚠️

<!-- GETTING STARTED -->

## Getting Started

One thing to note is that this stack is _kind of opinionated_, but you are completely free to tweak anything according to your needs and preferences. For example, this stack heavily depends on Supabase for auth and file storage, but you are still free to setup/build your preferred way of handling auth and storage.

The instructions below will mostly cover the default pre-configured frameworks and libraries I personally chose as the starting template of the V6 Stack.

### Prerequisites

- [pnpm](https://pnpm.io/installation)
- [docker](https://www.docker.com/) (optional, for supabase local development)

### Setup and installation

#### 1. Install packages

```sh
$ pnpm install
```

#### 2. Setup env files

Several `.env.template` files have been created for you. Create your own `.env` to be used in your project. Adjust the needed values accordingly.

#### 3. Initialize supabase

To develop using supabase locally, a supabase config is provided inside the `server` app. Navigate to the `server` folder and run

```sh
npx supabase start
```

to start your own local supabase instance through docker. Run

```sh
npx supabase stop
```

inside the `server` folder to shutdown the containers. For more guides and reference please refer to their [official docs](https://supabase.com/docs/guides/cli/local-development).

#### 4. Prisma Migrate

Create a Prisma migration to sync changes in your `schema.prisma` to your database. Navigate to the `db` package and run this command.

```sh
pnpm db:migrate
```

#### 5. Supabase Auth

If you're using supabase's auth service, chances are you also want to store your user's data inside your database's `public` schema. A minimal SQL function and trigger has been provided for you inside `apps/server/supabase/triggers` .

```sql
-- handle_new_users.sql
-- inserts a row into public.Profile
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public."Profile" ("userId")
  values (new.id);
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

```

Run this query on your database to duplicate a user's data every time a user signs up using supabase auth.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

_Please refer to our non-existent [Documentation](https://example.com)_. We're working on it, I promise.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [ ] Separate Supabase to a package
- [ ] Add a reusable `ui` package
- [ ] Properly implement reusable configs
  - [ ] eslint
  - [ ] tsconfig
- [ ] ✨ create-v6-app CLI ✨

See the [open issues](https://github.com/entry-point-community/v6-app/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Project Link: [https://github.com/entry-point-community/v6-app](https://github.com/entry-point-community/v6-app)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments and references

- [T3 Stack](https://github.com/t3-oss/create-t3-app)
- [Bulletproof React](https://github.com/alan2207/bulletproof-react)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/entry-point-community/v6-app.svg?style=for-the-badge
[contributors-url]: https://github.com/entry-point-community/v6-app/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/entry-point-community/v6-app.svg?style=for-the-badge
[forks-url]: https://github.com/entry-point-community/v6-app/network/members
[stars-shield]: https://img.shields.io/github/stars/entry-point-community/v6-app.svg?style=for-the-badge
[stars-url]: https://github.com/entry-point-community/v6-app/stargazers
[issues-shield]: https://img.shields.io/github/issues/entry-point-community/v6-app.svg?style=for-the-badge
[issues-url]: https://github.com/entry-point-community/v6-app/issues
[license-shield]: https://img.shields.io/github/license/entry-point-community/v6-app.svg?style=for-the-badge
[license-url]: https://github.com/entry-point-community/v6-app/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com

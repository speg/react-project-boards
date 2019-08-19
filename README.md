# react-project-boards
A toy kanban board using React.

## why
to practice react. and to make a thing to track all the things!

## typescript
perhaps we should use type script to compile all the things.


## compiling
my goodness it's the wild west out there.
typescript can only compile two module systems to a single file.. so can't use that for development
as we want to use to commonjs or ES6 for our npm lib. maybe have two build process for lib and dev?
Try rollup but it's a bit messy. Pacel seems great. Easy! Don't need Typescript anymore? I don't know.
Now it's complaning about Babel. I didn't want to use Babel! Is parcel requiring it?

Finally got my componenet loading into another demo app! Compiled my source with TSC into ES6 and it just worked?!
Woohoo. Oh wait - now hooks are complaining about two versions of React 🤯. [This](https://reactjs.org/warnings/invalid-hook-call-warning.html) fixed me up in a few minutes. Phew.

Spent some time trying to get a single page (systemjs or amd) working, but realzing that may be a fools errand
as they depend on React. How to link to the dev React loaded on the demo page when compiling code? Don't think
that's going to work... Will have to load it up in the create-react-app application to test in browser. I guess the dev config is useless then.

Ok after a nights sleep I've got the browser working for development. Export everything to AMD. Then, using requirejs paths, specify they React and React-Dom libraries. Even better? Name them as per their AMD module names and you don't need any config. Boom.


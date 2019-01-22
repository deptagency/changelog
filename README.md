<p align="center">
    <img src="https://raw.githubusercontent.com/deptagency/changelog/master/changelog.png" width="128" height="128" alt="Changelog">
    <br>
    <br>
    <b>Changelog</b>
    <br>
    Magically creates a YML file with metadata of a change entry
</p>


### Install

```bash
npm install @deptagency/changelog
```

*or*

```bash
yarn add @deptagency/changelog
```


### Usage

`package.json`
```json
{
  "scripts": {
    "changelog": "node ./node_modules/@deptagency/changelog"
  }
}
```

```bash
npm changelog
```

*or*

```bash
yarn changelog
```


### CLI arguments (optional)

| Argument | Description       | Default                   |
|----------|-------------------| ------------------------- |
| `path`   | File path         | `./changelog/unreleased/` |
| `file`   | File name         | `%s-%s.yml`               |


##### File name format

| Value  | Description       | Slugified |
|--------|-------------------|---------- |
| `%1$s` | Jira ticket       | `true`    |
| `%2$s` | Changelog message | `true`    |


### Prompt

| Question          | Hint                                   |       Type     |
|-------------------|----------------------------------------|:--------------:|
| Changelog message | ... e.g. Bug ticket title              |     `text`     |
| Type of change    | ... use arrow-keys, return to submit | `autocomplete` |
| Jira ticket       | ... e.g. HD-987                        |     `text`     |
| Merge Request     | ... e.g. 790                           |     `text`     |


### Icon
Made by [Freepik](https://www.freepik.com) from [www.flaticon.com](https://www.flaticon.com)

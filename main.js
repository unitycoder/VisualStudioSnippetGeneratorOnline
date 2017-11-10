var editor = ace.edit("editor");
editor.setTheme("ace/theme/github");
editor.getSession().setMode("ace/mode/xml");

/**
 * The Template for Generating Snippet
 * @type {String}
 */
var template = `<?xml version="1.0" encoding="utf-8" ?>
<CodeSnippets  xmlns="http://schemas.microsoft.com/VisualStudio/2005/CodeSnippet">
  <CodeSnippet Format="1.0.0">
    <Header>
      <Title>##TITLE##</Title>
      <Shortcut>##SHORTCUT##</Shortcut>
      <Description>##DESCRIPTION##</Description>
      <Author>##AUTHOR##</Author>
    </Header>
    <Snippet>
      <Declarations>
        <Literal Editable="false"></Literal>
      </Declarations>
      <Code Language="csharp"><![CDATA[##CODE##]]></Code>
    </Snippet>
  </CodeSnippet>
</CodeSnippets>`;

/**
 * The tags dictionary
 * @type {Array}
 */
var tags = [
  {
    replace: "##TITLE##",
    id: "shortcut",
    value: "",
    getValue: function (value) {
      return value;
    }
  }, {
    replace: "##SHORTCUT##",
    id: "shortcut",
    value: "",
    getValue: function (value) {
      return value;
    }
  }, {
    replace: "##DESCRIPTION##",
    id: "description",
    value: "",
    getValue: function (value) {
      return value;
    }
  }, {
    replace: "##AUTHOR##",
    id: "author",
    value: "",
    getValue: function (value) {
      return value;
    }
  }, {
    replace: "##CODE##",
    id: "code",
    value: "",
    getValue: function (value) {
      if (value.indexOf("$end$") === -1) {
        return value + "$end$";
      }
      return value;
    }
  }
];

/**
 * The ACE editor instance
 * @type {Editor}
 */
var editor = ace.edit("editor");

/**
 * Download the generated snippet as file
 */
function Download() {
  if (editor.getValue() == "") {
    // alert("Nothing to download..");
    return;
  }
  DownloadAsTextFile(GetVal("shortcut") + ".snippet", editor.getValue());
}

/**
 * Copy the generated snippet
 */
function Copy() {
  editor.focus();
  editor.selectAll();
  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }
}

/**
 * Generate the snippet
 */
function Generate() {

  // Get tags value
  for (let tag of tags) {
    tag.value = GetVal(tag.id);
  }

  var out = document.getElementById("editor");
  var d = template;

  // Replace tags value
  for (let tag of tags) {
    let value = "";
    if (tag.getValue === null || tag.getValue === undefined) {
      value = tag.value;
    } else {
      value = tag.getValue(tag.value);
    }
    d = d.replace(tag.replace, value);
  }

  editor.setValue(d);
}

/**
 * Get the field value
 * @param       {String} id The field id
 */
function GetVal(id) {
  if (document.getElementById(id) == null) {
    console.log("Missing element: " + id);
    return null;
  }
  return document.getElementById(id).value;
}

/**
 * Get the checkbox state
 * @param       {String} id The checkbox id
 */
function GetCheckbox(id) {
  if (document.getElementById(id) == null) {
    console.log("Missing element: " + id);
    return null;
  }
  return document.getElementById(id).checked;
}

/**
 * Download the text as file
 * @param       {String} filename The file name
 * @param       {String} text     The text to put in the file
 * @see {@link https://stackoverflow.com/a/18197341/5452781} for further information.
 */
function DownloadAsTextFile(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

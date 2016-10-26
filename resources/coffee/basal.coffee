Basal =

  domain: 'http://basal.tech/api'
  client: false

  data: false
  structures: false

  i: (client) ->

    @client = client

    @getStructures ->

      $(".basal-each").each (i, el) ->

        el = $(el)
        structure = el.attr("basal-structure")

        throw new Error "Basal: Structure not found \"#{structure}\"" if !Basal.structures[structure]?

        template = el.children().remove()

        for own name, entry of Basal.structures[structure].entries
          tpl = template.clone()
          tpl.find('*').each (ci, cel) ->
            jcel = $(cel)
            name = jcel.attr('basal-name')
            type = jcel.attr('basal-type')
            return true if name is undefined
            if type isnt undefined
              switch type
                when 'css-background'
                  jcel.css 'background-image', "url(#{entry.entities[name].value})"
                when 'date'
                  jcel.html moment(entry.entities[name].value, 'MM/DD/YYYY').format jcel.attr('basal-dateformat')

            else
              if name is 'structure-name'
                jcel.html entry.name
              else
                jcel.html entry.entities[name].value
          el.append tpl

  getStructures: (complete) ->
    @jsonp "structures", client: @client, (result) =>
      @structures = {}
      for i,structure of result.data
        @structures[structure.name] = structure
      complete?()

  jsonp: (endpoint, params, complete) ->

    params.callback = 'Basal.callback'

    script = "#{@domain}/#{endpoint}?" + $.param params

    el = document.createElement 'script'
    el.src = script
    el.addEventListener 'load' , (e) ->
      complete?(Basal.data)
      Basal.data = false
    , false

    document.getElementsByTagName('head')[0].appendChild(el)

  callback: (data) ->
    Basal.data = data

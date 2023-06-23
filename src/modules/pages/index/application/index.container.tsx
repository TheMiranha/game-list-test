import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { LoaderContainer } from './loader/loader.container'
import { getGames } from '../domain/games.actions'
import { config } from '../config/base'
import { IGame } from '../domain/game'
import {
  Button,
  Card,
  Col,
  Dropdown,
  FormElement,
  Grid,
  Input,
  Spacer,
  Text
} from '@nextui-org/react'
import { ServerErrorContainer } from './server-error/server-error.container'

export const IndexContainer = () => {
  const [loading, setLoading] = useState(true)
  const [games, setGames] = useState<IGame[]>([])
  const [search, setSearch] = useState<string>('')
  const [genre, setGenre] = useState<string>('Todos')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    loadGames()
  }, [])

  const loadGames = async () => {
    const response = await getGames({
      gamesOutput: config.gamesProvider
    })
    if (response.data) {
      setGames(response.data)
    } else {
      setError(response.message)
    }
    setLoading(false)
  }

  const visibleGames = useMemo(() => {
    let filter = games.filter(game => {
      return game.title.toLowerCase().includes(search.toLowerCase())
    })
    if (genre.length > 0) {
      filter = filter.filter(game => game.genre === genre || genre == 'Todos')
    }
    return filter
  }, [search, games, genre])

  const allGenres = useMemo(() => {
    let genres = games.map(game => game.genre)
    genres = genres.filter((genre, index) => genres.indexOf(genre) === index)
    let all = ['Todos']
    all.push(...genres)
    return all
  }, [games])

  const handleSearchChange = (e: ChangeEvent<FormElement>) => {
    setSearch(e.target.value)
  }

  if (loading) {
    return <LoaderContainer />
  }

  if (error.length > 0) {
    return <ServerErrorContainer error={error} />
  }

  return (
    <div
      style={{
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '50px'
      }}
    >
      <div
        style={{
          width: '800px',
          maxWidth: '98vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', gap: '10px' }}>
          <Input
            value={search}
            onChange={handleSearchChange}
            clearable
            underlined
            labelPlaceholder="Pesquisa"
          />
          <Dropdown>
            <Dropdown.Button flat color="secondary">
              Generos
            </Dropdown.Button>
            <Dropdown.Menu
              color="secondary"
              aria-label="Gêneros"
              css={{ $$dropdownMenuWidth: '280px' }}
              selectionMode="single"
              selectedKeys={[genre]}
              disallowEmptySelection
              onSelectionChange={e => {
                setGenre(Array.from(e)[0]?.toString() || genre)
              }}
            >
              {allGenres.map(genre => (
                <Dropdown.Item key={genre} textValue={genre}>
                  {genre}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Cards games={visibleGames} />
      </div>
    </div>
  )
}

const Cards = ({ games }: { games: IGame[] }) => {
  return (
    <Grid.Container gap={3} style={{ width: '100%' }}>
      {games.map(game => (
        <Grid
          xs={12}
          sm={4}
          key={`${game.id}`}
          alignContent="center"
          justify="center"
        >
          <Card style={{ height: '250px', width: '200px' }}>
            <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
              <Col>
                <Text
                  size={12}
                  weight="bold"
                  transform="uppercase"
                  color="#ffffffAA"
                >
                  {game.publisher}
                </Text>
                <Text h4 color="white">
                  {game.title}
                </Text>
              </Col>
            </Card.Header>
            <Card.Image
              src={game.thumbnail}
              objectFit="cover"
              width="100%"
              height={250}
              alt="Card image background"
            />
            <Card.Divider />
            <Card.Footer
              style={{
                flexDirection: 'column'
              }}
            >
              <Text>{game.genre}</Text>
            </Card.Footer>
          </Card>
        </Grid>
      ))}
    </Grid.Container>
  )
}
